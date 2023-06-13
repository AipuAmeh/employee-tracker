const questions = {
  addDepartment: [
    {
      type: 'input',
      message: "What's the name of your department?",
      name: "department_name",
    },
  ],
  addRole(choicesArr) {
    return [
      {
        type: "input",
        message: "What's the name of your role?",
        name: "role_title",
      },
      {
        type: "input",
        message: "What's the salary of your role?",
        name: "salary",
      },
      {
        type: "list",
        message: "What's the department your role belongs to?",
        name: "department_id",
        choices: choicesArr,
      },
    ];
  },
  addEmployee(choicesArr, choicesArrTwo) {
    return [
        {
            type: "input",
            message: "What is the employees first name?",
            name: "first_name",
        },
        {
          type: "input",
          message: "What is the employees last name?",
          name: "last_name",
        },
        {
          type: "list",
          message: "What is the employees role?",
          name: "role_id",
          choices: choicesArr,
        },
        {
          type: "list",
          message: "Which manager does the employee belong to?",
          name: "manager_id",
          choices: choicesArrTwo,
        }
    ]
  },
  updateEmployee(choicesArr, choicesArrTwo) {
    return [
      {
        type: "list",
        message: "Please select an employee to update",
        name: "employee_name",
        choices: choicesArr,
      },
      {
        type: "list",
        message: "Please select a role to update",
        name: "role_id",
        choices: choicesArrTwo
      }
    ]
  }
};

module.exports = questions;
