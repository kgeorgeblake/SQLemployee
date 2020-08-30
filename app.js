var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "theroots",
  database: "employee_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add departments",
        "Add roles",
        "Add employees",
        "View departments",
        "View roles",
        "View employees",
        "Update employee roles",
        "EXIT"]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add departments":
          addDepartments();
          break;

        case "Add roles":
          addRoles();
          break;

        case "Add employees":
          addEmployees();
          break;

        case "View departments":
          viewDepartments();
          break;

        case "View roles":
          viewRoles();
          break;

        case "View employees":
          viewEmployees();
          break;

        case "Update Employee Roles":
          updateRole();
          break;

        case 'Exit':
          connection.end();
          break;
      }
    });
}

function addDepartments() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the department name?",
      name: "dep_name"
    },
  ])
    .then(function (answer) {
      query = "INSERT INTO department SET ?";
      connection.query(
        query,
        {
          "dept_name": answer.dep_name,
        }, (err) => {
          if (err) throw err;
          console.log('Department added');
          start();
        }
      );
    });
}

function addRoles() {
  connection.query ("select * from department", function(err, departments){

    if (err) throw err;

    const departmentChoices = departments.map ( department =>{
      const {dept_name, id} = department;
      return {
        name:dept_name,
        value:id
      }

    } )

    console.table(departmentChoices)

    inquirer.prompt([
      {
        type: "input",
        message: "What is the role name?",
        name: "rol_name"
      },
      {
        type: "input",
        message:"What is the salary?",
        name:"salary"
      },
      {
        type: "list",
        message: "What is the department",
        choices: departmentChoices,
        name:"dept_id"
      }
    ])
      .then(function (answer) {
        query = "INSERT INTO role SET ?";
        connection.query(
          query,
          {
            "title": answer.rol_name,
            "salary": answer.salary,
            "department_id": answer.dept_id
          }, (err) => {
            if (err) throw err;
            console.log('Role added');
            start();
          }
        );
      });
  })
  
}

function addEmployees() {
  // get all the roles
  // construct a list of roles (name, id)

  // ask user for employee last name
  // ask user for role

  inquirer.prompt([
    {
      type: "input",
      message: "What is the employee first name?",
      name: "first_name"
    },
  ])
    .then(function (answer) {
      query = "INSERT INTO employee SET?";
      connection.query(
        query,
        {
          "first_name": answer.emp_name,
        }, (err) => {
          if (err) throw err;
          console.log('Employee added');
          start();
        }
      );
    });
}





function viewDepartments(){

  connection.query ("select * from department", function(err, departments){
    if (err) throw err
    console.table(departments)
    start();
  })

}

function viewRoles(){

  connection.query ("select a.title, a.salary, b.dept_name from role as a inner join department as b on a.department_id=b.id", function(err, roles){
    if (err) throw err;
    console.table(roles)
    start();
  })

}

function viewDepartments(){

  connection.query ("select * from department", function(err, departments){
    if (err) throw err
    console.table(departments)
    start();
  })

}

function viewEmployees(){

  connection.query ("select emp_name from employee", function(err, employee){
    if (err) throw err;
    console.table(employee)
    start();
  })

}




function updateRole() {
  var allEmployees = [];
  connection.query("SELECT * FROM employee", function(err, answer) {

    for (let i = 0; i < answer.length; i++) {
      let employeeString =
        answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
      allEmployees.push(employeeString);
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "updateRole",
          message: "Select employee to role",
          choices: allEmployees
        },
        {
          type: "list",
          message: "Select a new role",
          choices: ["employee"],
          name: "newRole"
        }
      ])
      .then(function(answer) {
        console.log("Updating", answer);
     
        connection.query(
          "UPDATE employee SET role_id = ? WHERE id = ?",
          [idUpdate.role_id],
            start()
        );
      });
  });
}
//View Employee
//Update Role


