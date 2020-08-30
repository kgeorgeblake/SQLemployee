DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  dept_name VARCHAR(30) Not NULL,
);

CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (9,2) NOT NULL,
  department_id INT NOT NULL,
);


CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NUll,
  manager_id INT,
);
