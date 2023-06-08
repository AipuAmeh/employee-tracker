const inquirer = require("inquirer");
const mysql = require("mysql2");
const questions = require("./questions")
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "blanche!",
    database: "tracker_db",
  },
  console.log(`Connected to the tracker_db database.`)
);

class Options {
  constructor(department, roles, employees) {
    this.department = department;
    this.roles = roles;
    this.employees = employees;
  }
  viewOptions() {
    inquirer
      .prompt([
        {
          name: "options",
          type: "list",
          message: "What would you like to do?",
          choices: [
            "View All Departments",
            "Add a Department",
            "View All Roles",
            "Add a Role",
            "View All Employees",
            "Add an Employee",
            "Update an Employee",
          ],
        },
      ])
      .then(async (response) => {
        //make logic for each viewing option
        // FIX INDEX //
        switch (response.options) {
            case "View All Departments":
                return this.viewDepartments()
            case "View All Roles":
                return this.viewRoles()
            case "View All Employees":
                return this.viewEmployees()
            case "Add a Role":
                return this.addRole()     
            default:
                db.end(err => err ? console.log(err) : console.log("thanks for using our software"))
        }
      });
  }
  async viewDepartments(){
    db.promise()
    .query(`SELECT * FROM departments`)
    .then(([results]) => {
      console.table(results);
    })
    .catch(console.log)
    .finally(() =>this.viewOptions());
  }
  async viewRoles(){
    db.promise()
    .query(`SELECT * FROM role`)
    .then(([results]) => {
      console.table(results);
    })
    .catch(console.log)
    .finally(() =>this.viewOptions());
  }
  async viewEmployees() {
    db.promise()
    .query(`SELECT * FROM employee`)
    .then(([results]) => {
        console.table(results);
    })
    .catch(console.log)
    .finally(() => this.viewOptions());
  }
  async addRole(){
    // WE need the current departments
    const [departments] = await db.promise().query(`SELECT * FROM departments`)
    console.log(departments)
    const formattedDepartments = departments.map(row => ({value: row.id, name: row.department_name}))
    console.log(formattedDepartments)
    // WE need the title, the salary, and the departmentId
    const answers = await inquirer.prompt(questions.addRole(formattedDepartments))
    console.log(answers)
    //figure out the actual addition
  }

  //make new class for each adding option
  // addOptions()

  //make new class for updating option
  // updateOptions()
}

module.exports = Options;
