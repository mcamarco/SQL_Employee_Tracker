-- DEPARTMENT

INSERT INTO department (name)
VALUES ("Executive"), ("Accounting"), ("Sales"), ("Information Technology");

-- ROLE

INSERT INTO
    role (title, salary, department_id)
VALUES ("CEO", 10000000, 1), ("Accountant", 100000, 2), ("Sales", 120000, 3), ("CIO", 250000, 4);

-- EMPLOYEE

INSERT INTO
    employee (
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES ("Mickey", "Camarco", 1, NULL), ("Houdini", "Camarco", 4, 1);