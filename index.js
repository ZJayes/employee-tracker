const inquirer = require("inquirer")
const mysql = require("mysql")

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

