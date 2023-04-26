const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mickey23',
  database: 'employee_db'
});

// FIRST QUESTION
function promptUser() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          'Add Department',
          'View All Roles',
          'Add Role',
          'View All Employees',
          'Add an Employee',
          'Update Employee Role',
          'Quit',
        ]
      }
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addADepartment();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'Add Role':
          addARole();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add an Employee':
          addAnEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        default:
          db.end();
      }
    });
}

// View All Departments
function viewAllDepartments() {
  db.query('SELECT * from department', (err, result) => {
    if (err) throw err;
    console.table(result);
    promptUser();
  })
};

// Add Department
function addADepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department_name',
        message: 'What is the new Department name?',
      }])
    .then(data => {
      db.query('INSERT INTO department SET ?', { name: data.department_name })
      console.log(`Department name ${data.department_name} added successfully.`);
      promptUser();
    })
};

// View All Roles
function viewAllRoles() {
  db.query('SELECT * from role', (err, result) => {
    if (err) throw err;
    console.table(result);
    promptUser();
  })
};
// Add Role (query dept table to get existing IDs)
function addARole() {
  db.query('SELECT * FROM department', (err, result) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the role title?',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the role salary?',
        },
        {
          type: 'list',
          name: 'department_name',
          message: 'What department is the role in?',
          choices: result.map(department => department.name)
        }])
      // Find department ID that matches answer by department_name
      .then(data => {
        let department = result.find(department => department.name === data.department_name)
        db.query('INSERT INTO role SET ?', {
          title: data.title, salary: data.salary, department_id: department.id
        })
        promptUser();
      })
  })
};


// View All Employees
function viewAllEmployees() {
  db.query('SELECT * from employees', (err, result) => {
    if (err) throw err;
    console.table(result);
    promptUser();
  })
};

// Add an Employee
function addAnEmployee() {
  db.query('SELECT * FROM role', (err, result) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'What is their FIRST name?',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'What is their LAST name?',
        },
        // ROLE ID
        {
          type: 'list',
          name: 'role_id',
          message: 'What is the role title?',
          choices: result.map(role => role.title)
        },
        // MGR ID
        {
          type: 'list',
          name: 'manager_id',
          message: 'Who is the Manager ID?',
          choices: [1, 2, 3]
        }])

      // Find mgr ID that matches answer by mgr name
      .then(data => {
        let role = result.find(role => role.title === data.role_id)
        db.query('INSERT INTO employee SET ?', {
          first_name: data.first_name,
          last_name: data.last_name,
          role_id: role.id,
          manager_id: data.manager_id
        })
        // TODO: add a .then to show manager NAME when adding a new employee & backround would read as manager #

        promptUser();
      })
  })
};
// Update Employee Role
function updateEmployeeRole() {
  db.query('SELECT * FROM role', (err, result) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'What is their FIRST name?',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'What is their LAST name?',
        },
        // ROLE ID
        {
          type: 'list',
          name: 'role_id',
          message: 'What is the role title?',
          choices: result.map(role => role.title)
        },
        // MGR ID
        {
          type: 'list',
          name: 'manager_id',
          message: 'Who is the Manager ID?',
          choices: [1, 2, 3]
        }
      ])

      // Find mgr ID that matches answer by mgr name
      .then(data => {
        let role = result.find(role => role.title === data.role_id);
        db.query('INSERT INTO employee SET ?', {
          first_name: data.first_name,
          last_name: data.last_name,
          role_id: role.id,
          manager_id: data.manager_id
        }, (err, result) => {
          if (err) throw err;
          console.log('Employee role updated successfully.');
          promptUser();
        });
      });
  });
}
