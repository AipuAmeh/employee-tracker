const questions = {
  addDepartment: [
    {
      type: "input",
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
        name: "role_salary",
      },
      {
        type: "list",
        message: "What's the department your role belongs to",
        name: "role_department_id",
        choices: choicesArr,
      },
    ];
  },
};

module.exports = questions;
