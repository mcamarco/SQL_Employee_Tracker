SELECT
    employee.id,
    CONCAT(
        employee.first_name,
        ' ',
        employee.last_name
    ) AS employee_name,
    role.title,
    department.name AS department,
    role.salary,
    CONCAT(
        manager.first_name,
        ' ',
        manager.last_name
    ) AS manager_name
FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id;