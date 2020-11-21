const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require ("util");

const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//Function prompts user for which type of member they'd like to add, or calls the render if they're done adding members.
const employeeTypePrompt = () => {
    inquirer.prompt([{
        type: "list",
        message: "What type of employee would you like to add?",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
            "I'm done adding team members"
        ],
        name: "empType"
        }
    ]).then (function(response) {
        if(response.empType === "I'm done adding team members"){
            render(employees);
        }
        else{
            employeeDataPrompt(response.empType);
        }
    })
}

//Function creates employee objects based on user input
const employeeDataPrompt = (type) => {
    
    let newEmployee;
    console.log(type);

    inquirer.prompt([{
        type: "input",
        message: "What is the employee's name?",
        name: "name"
        },
        {
        type: "input",
        message: "What is the employee's id?",
        name: "id"
        },
        {
        type: "input",
        message: "What is the employee's email?",
        name: "email"
        }
    ]).then (function(basicData) {
        switch(type){
            case "Manager":
                inquirer.prompt([{
                    type: "input",
                    message: "What is the managers's office number?",
                    name: "officeNum"
                    }
                ]).then (function(typeData){
                    newEmployee = new Manager(basicData.name, basicData.id, basicData.email, typeData.officeNum);

                    //Add the new employee to the employee array
                    employees.push(newEmployee);
                    console.log(employees);
                })
            break;
            case "Engineer":
                newEmployee = new Engineer();
            break;
            case "Intern":
                newEmployee = new Intern();
            break;
            default:
                console.log("Please enter a valid employee type")
                employeeTypePrompt();
            break;
        }
        

        //get the next employee from the user
        //employeeTypePrompt();
    })
}

// console.log(response);
//     let markdown = generateMarkdown(response);

//     writeFileAsync("README.md", markdown).then( 
//         err => console.log("Success!")
//     );

// function generateMarkdown(response) {
//     let markdownString = 
// `
// `
//     return(markdownString)
// }

//Initial user prompt function
const welcomePrompt = () => {
    console.log(`Welcome to the team builder app. `)
    employeeTypePrompt();
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

//start with the welcome prompt
welcomePrompt();