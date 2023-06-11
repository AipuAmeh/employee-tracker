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
        message: "What's the department your role belongs to",
        name: "department_id",
        choices: choicesArr,
      },
    ];
  },
//   addDepartment(choicesArr) {
//     return [
//         {
//             type:
//         }
//     ]
//   }
};

module.exports = questions;
