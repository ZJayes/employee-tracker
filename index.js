const inquirer = require("inquirer")
const mysql = require("mysql");
const { exit } = require("process");
const { formatWithOptions } = require("util");

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'employeetracker_DB'
  });

  connection.connect(err => {
    if (err) throw err
    console.log(`Connected to mysql on thread ${connection.threadId}`)
});

// Add departments, roles, employees


const choice = "View all employees, View all departments, View all roles, Add new employee, Add new department, Add new role, update employees role, exit";
//taking strings and splitting into an array where commas are
const options = choice.split(",")


const employeeTracker = () => {
    inquirer.prompt([
        {
            name:"user",
            type:"list",
            message: "What would you like to do?",
            choices: options,
        }
    ]).then(answer => {
        if(answer.action === options[0]){
            viewEmployees()
        }else if (answer.action === options [1]){
            viewDepartments()
        }else if (answer.action === options [2]){
            viewRoles()
        }else if (answer.action === options [3]){
            addEmployee()
        }else if (answer.action === options [4]){
            addDepartment()
        }else if (answer.action === options [5]){
            addRole()
        }else if (answer.action === options [6]){
            updateRole()
        }else {
            exit()
        }
    })
}

// View departments, roles, employees


// Update employee roles

