const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table')
const { opening } = require('./questions')
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addADepartment, addARole, addAnEmployee, updateEmpRole } = require('./queries')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mickey23',
  database: 'employees_db'
});

function promptUser() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'Update Employee Role',
          'View All Roles',
          'Add Role',
          'View All Departments',
          'Add Department',
          'Quit',
          'View All Employees'
        ]
      }
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'Add Role':
          addARole();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addADepartment();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        default:
          db.end();
      }
    });
}

promptUser();

// function updateEmployeeRole() {
//   inquirer
//     .prompt([
//       {
//         type: 'input',
//         name: 'title',
//         message: 'Enter the new role title:'
//       },
//       {
//         type: 'input',
//         name: 'salary',
//         message: 'Enter the new role salary:'
//       },
//       {
//         type: 'input',
//         name: 'department_id',
//         message: 'Enter the new role department ID:'
//       }
//     ])
//     .then((answers) => {
//       db.query(
//         `UPDATE roles SET title = ?, salary = ?, department_id = ? WHERE id = ?`,
//         [answers.title, answers.salary, answers.department_id, roleId],
//         (err, result) => {
//           if (err) throw err;
//           console.log(`Role ${roleId} updated successfully.`);
//           promptUser();
//         }
//       );
//     });
// }

// function viewAllRoles() {
//   db.query(viewAllRolesQuery, (err, result) => {
//     if (err) throw err;
//     console.table(result);
//     promptUser();
//   });
// }

// function addARole() {
//   inquirer
//     .prompt([
//       {
//         type: 'input',
//         name: 'title',
//         message: 'Enter the role title:'
//       },
//       {
//         type: 'input',
//         name: 'salary',
//         message: 'Enter the role salary:'
//       },
//       {
//         type: 'input',
//         name: 'department_id',
//         message: 'Enter the role department ID:'
//       }
//     ])
//     .then((answers) => {
//       db.query(
//         `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
//         [answers.title, answers.salary, answers.department_id],
//         (err, result) => {
//           if (err) throw err;
//           console.log(`Role ${result.insertId} added successfully.`);
//           prompt
//         })
//     });
