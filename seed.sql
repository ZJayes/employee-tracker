DROP DATABASE IF EXISTS employeetracker_DB;

CREATE DATABASE employeetracker_DB;

USE employeetracker_DB;

CREATE TABLE department(
    id INT (100) NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT (100) NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary FLOAT(8,2),
    department_id INT (100) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT(100) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT (100) NOT NULL,
    manager_id INT (100) NULL,
    PRIMARY KEY(id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Zac", "Jayes", "9", "33");
INSERT INTO department (name) VALUES ("HR");
INSERT INTO role (title, salary, department_id) VALUES ("CEO", "100000", "10");
