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
        //only one manager per team is allowed
        if(response.empType === "Manager"){
            if(employees.some((staff) => staff instanceof Manager)){
                console.log("Each team has only one manager.");
                employeeTypePrompt();
                return;
            }
        }

        if(response.empType === "I'm done adding team members"){
            //make sure the team has a manager
            if(employees.some((staff) => staff instanceof Manager)){
                let htmlPage = render(employees);
                writeHTMLFile(htmlPage);
            }
            else{
                console.log("A team is nothing without a leader, please add a manager!");
                employeeTypePrompt();
            }
        }
        else{
            employeeDataPrompt(response.empType);
        }
    })
}

//Function creates employee objects based on user input
const employeeDataPrompt = (type) => {
    
    let newEmployee;

    //get the generic info first
    inquirer.prompt([{
        type: "input",
        message: "What is the employee's name?",
        name: "name"
        },
        {
        type: "input",
        message: "What is the employee's id?",
        name: "id",
        validate: validateNumeric
        },
        {
        type: "input",
        message: "What is the employee's email?",
        name: "email",
        validate: function (email) {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            if (valid) {
                return true;
            } else {
                console.log(`   Please enter a valid email`)
                return false;
            }
            }
        }
    ]).then (function(basicData) { //then the specific info per employee type
        switch(type){
            case "Manager":
                inquirer.prompt([{
                    type: "input",
                    message: "What is the managers's office number?",
                    name: "officeNum",
                    validate: validateNumeric
                    }
                ]).then (function(typeData){
                    newEmployee = new Manager(basicData.name, basicData.id, basicData.email, typeData.officeNum);
                    //Add the new employee to the employee array and get the next employee
                    employees.push(newEmployee);
                    employeeTypePrompt();
                })
            break;
            case "Engineer":
                inquirer.prompt([{
                    type: "input",
                    message: "What is the engineer's guthub username?",
                    name: "githubName"
                    }
                ]).then (function(typeData){
                    newEmployee = new Engineer(basicData.name, basicData.id, basicData.email, typeData.githubName);
                    //Add the new employee to the employee array and get the next employee
                    employees.push(newEmployee);
                    employeeTypePrompt();
                })
            break;
            case "Intern":
                inquirer.prompt([{
                    type: "input",
                    message: "What is the intern's school name?",
                    name: "school"
                    }
                ]).then (function(typeData){
                    newEmployee = new Intern(basicData.name, basicData.id, basicData.email, typeData.school);
                    //Add the new employee to the employee array and get the next employee
                    employees.push(newEmployee);
                    employeeTypePrompt();
                })
            break;
            default:
                console.log("Please enter a valid employee type")
                employeeTypePrompt();
            break;
        }
    })
}

//Function validates numeric input. Input must be an integer, but values that parse to an int (234234xx) are not permitted either
function validateNumeric (input) {
    valid = Number.isInteger(parseInt(input)) && parseInt(input) == input;
    if (valid) {
        return true;
    } else {
        console.log(`   The ID must be numeric`)
        return false;
    }
    }

//Function writes the HTML file to the output path
const writeHTMLFile = (htmlString) => {

    // check if directory exists
    if (!fs.existsSync(outputPath)) {
        //make the directory if it doesn't exist
        fs.mkdirSync(OUTPUT_DIR);
    }

    //write the HTML file to the outputPath
    writeFileAsync(outputPath, htmlString).then( 
        err => console.log(`HTML Page generated! Output at: ${outputPath}`)
    );
}

//Initial user prompt function
const welcomePrompt = () => {
    console.log(`Welcome to the team builder app. `)
    employeeTypePrompt();
}

//start with the welcome prompt
welcomePrompt();