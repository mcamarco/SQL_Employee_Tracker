// Import and require mysql2, inquirer, and console.table packages
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Connect to the database using the provided credentials
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mickey23",
  database: "employees_db",
});

// Check if the connection is successful
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log(`Connected to the employees_db database.`);
  mainMenu();
});

// Function to display the main menu
function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuChoice",
        message: "Please choose an option from the menu below:",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.menuChoice) {
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add a Department":
          createDepartment();
          break;
        case "Add a Role":
          createRole();
          break;
        case "Add an Employee":
          createEmployee();
          break;
        case "Update an Employee Role":
          updateEmployeeRole();
          break;
        default:
          console.log("Goodbye!");
          db.end();
          break;
      }
    });
}

// Function to view all departments
function viewAllDepartments() {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    mainMenu();
  });
}

// Function to view all roles
function viewAllRoles() {
  const sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    mainMenu();
  });
}

// Function to view all employees
function viewAllEmployees() {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    mainMenu();
  });
}

// Create a department
function createDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "What is the name of the department you would like to add?",
        validate: (input) => {
          if (input === "") {
            return "Please enter a department name.";
          }
          return true;
        },
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (name) VALUES (?)`;
      const params = [answer.department_name];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Department added successfully!");
        viewAllDepartments();
      });
    });
}
// View all departments
function viewAllDepartments() {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    mainMenu();
  });
}
// Create a role
function createRole() {
  // Query the department table to get a list of department names
  db.query(`SELECT id, name FROM department`, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }

    // Map the department data to an array of objects with name and value properties
    const departmentChoices = rows.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of the role you would like to add?",
          validate: (input) => {
            if (input === "") {
              return "Please enter a role title.";
            }
            return true;
          },
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role you would like to add?",
          validate: (input) => {
            if (isNaN(input)) {
              return "Please enter a number.";
            }
            return true;
          },
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does this role belong to?",
          choices: departmentChoices,
        },
      ])
      .then((answer) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [
          answer.title,
          answer.salary,
          answer.department_id,
        ];

        db.query(sql, params, (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Role added successfully!");
          mainMenu();
        });
      });
  });
}

// View all roles
function viewRoles() {
  const sql = SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    mainMenu();
  });
}

// Create an employee
function createEmployee() {
  // Query the role table to get a list of role titles
  db.query(SELECT id, title FROM role, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
// Map the role data to an array of objects with name and value properties
const roleChoices = rows.map(({ id, title }) => ({
  name: title,
  value: id,
}));

// Query the employee table to get a list of manager names
db.query(
  `SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee`,
  (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }

    // Add a "None" option to the beginning of the manager choices array
    const managerChoices = [{ name: "None", value: null }];

    // Map the employee data to an array of objects with name and value properties
    managerChoices.push(
      ...rows.map(({ id, name }) => ({ name: name, value: id }))
    );

    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?",
          validate: (input) => {
            if (input === "") {
              return "You must enter a first name.";
            }
            return true;
          },
        },
        // add more prompt questions here
      ])
      .then((answers) => {
        // handle the answers
      });
  }
);
