const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table')

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

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID of the employee you want to update:'
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the ID of the new role:'
      }
    ])
    .then((answers) => {
      const { employeeId, roleId } = answers;
      db.query(
        `UPDATE employees SET role_id = ? WHERE id = ?`,
        [roleId, employeeId],
        (err, result) => {
          if (err) throw err;
          console.log(`Employee ${employeeId} role updated successfully.`);
          promptUser();
        }
      );
    });
}

promptUser();