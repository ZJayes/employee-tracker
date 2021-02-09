DROP DATABASE IF EXISTS employeetracker_DB;

CREATE DATABASE employeetracker_DB;

USE employeetracker_DB;

CREATE TABLE department(
    id INT (100) NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT (100) NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2),
    department_id INT (100) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT(100) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT (100) NOT NULL,
    manager_id INT (100) NOT NULL,
    PRIMARY KEY(id)
);