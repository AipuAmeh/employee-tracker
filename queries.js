const inquirer = require('inquirer');

class Options {
    constructor(department, roles, employees) {
        this.department = department;
        this.roles = roles;
        this.employees = employees;
    }

    viewOptions() {
        inquirer
        .prompt ([
        {
            name: 'options',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee']
        }
        ])
        .then((response) => {
            //make logic for each viewing option
            response.options === 'View All Departments'
            ? console.log(response.options, 'Success') 
            : console.log('Please select an option!')

        }) 
    }

    //make new class for each adding option
    // addOptions()

    //make new class for updating option
    // updateOptions()

}

module.exports = Options;