# employee-tracker
## Overview

This application is an employee tracker that that allows the user to view, create, or update employees from the company database using mySQL.  When creating a user you are able to view all employees, departments and the roles of the company.  You are also allowed to add new employees, dpartments and roles for the company as well.  You are able to update any employee role as well. 

All of the code can be added through the terminal. 

## Steps

First, I created my package.json and ran all of my installs. Second, I made my database using workbench.  Then, to start the javascript a created a const that held all of the options the user is going to see in the terminal and separated them by using a split at the ",".  Then, I created a inquirer prompt using a list to list out all of the options for the user to choose and where the user would be directed after making a choice.  For the functions, I used mySQL syntax to select where in the table I wanted to view, add, or update for employess, departments, and roles.  After every function, I pust employeeTracker() to reset the terminal for the user to select a new function.  At the end, there is an exit function that allows the user to exit the function and close the server.


Here is the link to my live view of the terminal:

https://drive.google.com/file/d/1x1_wgaf2OyPj4prmENMoJmbrO0TgzQBh/view?usp=sharing


