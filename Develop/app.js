const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];


var questions = [
    { 
    type: 'input', 
    message: 'What is your name?', 
    name: 'name'
},  {
    type: 'input',
    message: 'What is your employee ID?',
    name:'id'
},  { 
    type: 'input', 
    message: 'What is your email address?', 
    name: 'email'
},  { 
    type: 'list', 
    message: 'What is your role?', 
    choices: ['Engineer', 'Manager', 'Intern'], 
    name: 'role', 
    default: 'EMPLOYEE'
},  {
    type: 'input', 
    message: 'What is your office number?', 
    name: 'officeNumber',
    when: (answers) => answers.role === 'Manager'
},  {
    type: 'input',
    message: 'What is your GitHub username?',
    name: 'github',
    when: (answers) => answers.role === 'Engineer'
},  {
    type: 'input',
    message: 'What school do you go to?',
    name: 'school',
    when: (answers) => answers.role === 'Intern'
},  {
    type: 'list',
    message: 'Do you want to add another employee?',
    choices: ['Yes', 'No'],
    name: 'continue'
}
]

let inquirerPrompt = (questions) => {
    inquirer
    .prompt(questions)
    .then(answers => {

        if (answers.role === 'Manager') {
            let {name, id, email, officeNumber} = answers;
            let newTeamMember = new Manager(name, id, email, officeNumber);
            employees.push(newTeamMember);
            console.log(employees);
            if (answers.continue === 'Yes'){
            inquirerPrompt(questions);
            }
            else {
                fs.writeFile(outputPath, render(employees), (err) => {
                    if (err) throw err;
                })
            console.log('Your team website has been generated!');
            }
        }
        else if (answers.role === 'Intern') {
            let {name, id, email, school} = answers;
            let newTeamMember = new Intern(name, id, email, school);
            employees.push(newTeamMember);
            console.log(employees);
            if (answers.continue === 'Yes'){
                inquirerPrompt(questions);
            }
            else {
                fs.writeFile(outputPath, render(employees), (err) => {
                    if (err) throw err;
                })
            console.log('Your team website has been generated!');
            } 
        }
        else if (answers.role === 'Engineer') {
            let {name, id, email, github} = answers;
            let newTeamMember = new Engineer(name, id, email, github);
            employees.push(newTeamMember);
            console.log(employees);
            if (answers.continue === 'Yes'){
                inquirerPrompt(questions);
            }
            else {
                fs.writeFile(outputPath, render(employees), (err) => {
                    if (err) throw err;
                })
            console.log('Your team website has been generated!');
            } 
        }
    }) 

    .catch(error => {
        if(error) {
            console.log(error);
        }
    })
}

inquirerPrompt(questions);



        


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
