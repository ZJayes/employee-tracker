const inquirer = require("inquirer")
const mysql = require("mysql")


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employeetracker_DB'
});

connection.connect(err => {
    if (err) throw err
    console.log(`Connected to mysql on thread ${connection.threadId}`)
});

// Add departments, roles, employees

const choice = 'View all employees, View all departments, View all roles , Add new employee, Add new department, Add new role, Update employees role, Exit';

// //taking strings and splitting into an array where commas are
const options = choice.split(",")


const employeeTracker = () => {
    inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: "What would you like to do?",
            choices: options,
        }
        //selecting the option from the array above
    ]).then(answer => {
        console.log(answer)
        if (answer.action === options[0]) {
            viewEmployees()
        } else if (answer.action === options[1]) {
            viewDepartments()
        } else if (answer.action === options[2]) {
            viewRoles()
        } else if (answer.action === options[3]) {
            addEmployee()
        } else if (answer.action === options[4]) {
            addDepartment()
        } else if (answer.action === options[5]) {
            addRole()
        } else if (answer.action === options[6]) {
            updateRole()
        } else {
            exit()
        }
    })
}

//view all employees
const viewEmployees = () => {
    console.log("All Employees:")
    connection.query("SELECT first_name, last_name, role_id, manager_id FROM employee",
        {

        }, function (err, res) {
            if (err) throw err;
            console.table(res)
            employeeTracker()
        }
    )
}

//view departments

const viewDepartments = () => {
    console.log("All Departments:")
    connection.query("SELECT name FROM department",
        {

        }, function (err, res) {
            if (err) throw err;
            console.table(res)
            employeeTracker()
        }
    )
}

// view roles

const viewRoles = () => {
    console.log("All Roles:")
    connection.query("SELECT title, salary, department_id FROM role",
        {

        }, function (err, res) {
            if (err) throw err;
            console.table(res)
            employeeTracker()
        }
    )
}

//add employee

const addEmployee = () => {
    inquirer.prompt ([
        {
            name:"first",
            type:"input",
            message:"What is the first name?"
        },
        {
            name:"last",
            type:"input",
            message:"What is the last name?"
        },
        {
            name:"roleId",
            type:"input",
            message:"What is the role id?"
        },
        {
            name:"managerId",
            type:"input",
            message:"What is the manager id?"
        }
        //question marks are placeholders
    ]).then(answer => {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [
            answer.first, answer.last, answer.roleId, answer.managerId
        ], function (err, res) {
            if (err) throw err;
            viewEmployees()
            employeeTracker()
        }
        )
    })
    
}

//add department

const addDepartment = () => {
    inquirer.prompt ([
        {
            name:"depName",
            type:"input",
            message:"What is the department name?",
        },
    ]).then(answer => {
        connection.query("INSERT INTO department (name) VALUES (?)",
        [
            answer.depName
        ], function (err, res) {
            if (err) throw err;
            viewDepartments()
            employeeTracker()
        })
    })
}

const addRole = () => {
    inquirer.prompt ([
        {
            name:"title",
            type:"input",
            message:"What is the title of the role?",
        },
        {
            name:"salary",
            type:"input",
            message:"What is the salary of the role? (up to 6 figures)",
        },
        {
            name:"department",
            type:"input",
            message:"What is the department id for this role?",
        },
    ]).then(answer => {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
        [
            answer.title, answer.salary, answer.department
        ], function (err, res) {
            if (err) throw err;
            viewRoles()
            employeeTracker()
        })
    })
}

const updateRole = () => {
    inquirer.prompt([
        {
            name: "newRole",
            type: "input",
            message: "What is the new role id?"
        },
        {
            name: "employee",
            type: "input",
            message: "Who is getting the new role?"
        },
    ]).then(answer => {
        console.log("New Created Role:")
        connection.query(
            "UPDATE employee SET role_id = ? WHERE first_name = ?",
            [
                answer.newRole, answer.employee
            ], function (err, res) {
                if (err) throw err;
                viewEmployees()
                employeeTracker()
            }
        )
    })
}


// Update employee roles

const exit = () => {
    console.log("Bye")
    connection.end()
    process.exit()

}

//see in termial
employeeTracker()