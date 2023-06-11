const inquirer = require("inquirer");
const mysql = require("mysql2");
const questions = require("./questions");
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
            return this.viewDepartments();
          case "View All Roles":
            return this.viewRoles();
          case "View All Employees":
            return this.viewEmployees();
          case "Add a Department":
            return this.addDepartment();
          case "Add a Role":
            return this.addRole();
          case "Add an Employee":
            return this.addEmployee();
          default:
            db.end((err) =>
              err
                ? console.log(err)
                : console.log("thanks for using our software")
            );
        }
      });
  }
  async viewDepartments() {
    db.promise()
      .query(`SELECT * FROM departments`)
      .then(([results]) => {
        console.table(results);
      })
      .catch(console.log)
      .finally(() => this.viewOptions());
  }
  async viewRoles() {
    db.promise()
      .query(`SELECT * FROM role`)
      .then(([results]) => {
        console.table(results);
      })
      .catch(console.log)
      .finally(() => this.viewOptions());
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
  async addRole() {
    const [departments] = await db.promise().query(`SELECT * FROM departments`);

    const formattedDepartments = departments.map((row) => ({
      value: row.id,
      name: row.department_name,
    }));
    console.log(formattedDepartments);

    const answers = await inquirer.prompt(
      questions.addRole(formattedDepartments)
    );
    console.table(answers);

    var sql = `INSERT INTO role (role_title, salary, department_id) VALUES (?,?,?)`;
    var values = [answers.role_title, answers.salary, answers.department_id];

    await db.promise().query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
      }
    });
    const [role] = await db.promise().query(`SELECT * FROM role`);
    console.table(role);
    this.viewOptions();
  }
  async addDepartment() {
    const answers = await inquirer.prompt(questions.addDepartment);
    console.table(answers.department_name);
    var sql = `INSERT INTO departments (department_name) VALUES (?)`;
    var values = [answers.department_name];

    await db.promise().query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
      }
    });
    const [departments] = await db.promise().query(`SELECT * FROM departments`);
    console.table(departments);

    this.viewOptions();
  }
  async addEmployee() {
    const [role] = await db.promise().query(`SELECT * FROM role`);
    const formattedRole = role.map((row) => ({
      value: row.id,
      name: row.role_title,
    }));
    console.log(formattedRole);
    let [employee] = await db.promise().query(`SELECT * FROM employee`);
    const formattedEmployee = employee.map((row) => ({
      value: row.id,
      name: row.last_name,
    }));
    console.log(formattedEmployee);

    const answers = await inquirer.prompt(
      questions.addEmployee(formattedRole, formattedEmployee)
    );
    console.table(answers);

    var sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    var values = [
      answers.first_name,
      answers.last_name,
      answers.role_id,
      answers.manager_id,
    ];

    await db.promise().query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
      }
    });
    const [updatedEmployee] = await db
      .promise()
      .query(`SELECT * FROM employee`);
    console.table(updatedEmployee);
    this.viewOptions();
  }

  //make new class for updating option
  // updateOptions()
}

module.exports = Options;
