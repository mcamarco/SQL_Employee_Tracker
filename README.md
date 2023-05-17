# Employee Tracker

This command-line application allows business owners to easily view and manage their company's departments, roles, and employees. It provides a user-friendly interface to organize and plan the business effectively. The application is built using Node.js, Inquirer, and MySQL.

## Installation

1. Clone the GitHub repository.
2. Navigate to the project directory.
3. Install the required dependencies by running the following command:
   ```
   npm install
   ```

## Usage

1. Set up your MySQL database and update the database credentials in the `config.js` file.
2. Run the application by executing the following command:
   ```
   node index.js
   ```
3. The application will display a menu with the following options:
   - View All Departments
   - View All Roles
   - View All Employees
   - Add a Department
   - Add a Role
   - Add an Employee
   - Update an Employee Role
   - (Bonus) Update Employee Managers
   - (Bonus) View Employees by Manager
   - (Bonus) View Employees by Department
   - (Bonus) Delete Departments, Roles, and Employees
   - (Bonus) View Total Utilized Budget of a Department
4. Select an option using the arrow keys and press Enter to proceed.
5. Follow the prompts to perform the desired action.
6. The application will provide feedback and display the requested information or confirm the successful completion of the operation.

## Database Schema

The application uses a database schema with the following tables:

- **department**
  - id: INT PRIMARY KEY
  - name: VARCHAR(30) to hold department name

- **role**
  - id: INT PRIMARY KEY
  - title: VARCHAR(30) to hold role title
  - salary: DECIMAL to hold role salary
  - department_id: INT to hold reference to department role belongs to

- **employee**
  - id: INT PRIMARY KEY
  - first_name: VARCHAR(30) to hold employee first name
  - last_name: VARCHAR(30) to hold employee last name
  - role_id: INT to hold reference to employee role
  - manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)

## Walkthrough Video

[Link to the walkthrough video](<https://drive.google.com/file/d/1hx7YX1mtD_AE3BV2rvqdm7LebgyKyMHK/view>)

## Screenshots

![Screenshot 1](assets/Screenshot%202023-05-17%20005724.png)
![Screenshot 2](assets/Screenshot%202023-05-17%20005815.png)
![Screenshot 3](assets/Screenshot%202023-05-17%20005952.png)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please create an issue or submit a pull request.

## License

This project is licensed under the [MIT](LICENSE) license.