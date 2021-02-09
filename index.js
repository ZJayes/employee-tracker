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
            //does not need whats is quotes above
            exit()
        }
    })
}
//PUT employeeTracker() after every function to restart in the terminal
//view all employees
const viewEmployees = () => {
    console.log("All Employees:")
    //SELECT whats in the table first then FROM table
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
    //SELECT whats in the table first then FROM table
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
    //SELECT whats in the table first then FROM table
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
//inquirer prompt of questions to ask in the terminal to make the new user
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
        //answer.example takes what you enter in the terminal and posts it in the table
    ]).then(answer => {
        //INSERT INTO the table name (the columns separated by commas) VALUES (? as a placeholder)
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
        //answer.example takes what you enter in the terminal and posts it in the table
        //INSERT INTO table name (column) VALUES (? as placeholder)
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
        //answer.example takes what you enter in the terminal and posts it in the table
        //INSERT INTO table name (columns separated by commas) VALUES (? as placeholder)
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

//update role
//inquirer prompt questions in terminal 
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
            //answer.example takes what you enter in the terminal and posts it in the table
            //UPDATE table SET column = ?(placeholder) WHERE column = ?(placeholder)
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


//exit terminal
const exit = () => {
    console.log("Bye")
    connection.end()
    process.exit()

}

//see in termial
employeeTracker()