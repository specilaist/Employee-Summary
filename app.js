const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { type } = require("os");
const { Console } = require("console");

let teamLog = []
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function teamQuery() {
      //       if (answers.continue === true) {

      //             };
      //       }
      // }
      inquirer.prompt([
            {
                  name: 'name',
                  type: 'input',
                  message: 'Please give me your name'
            },
            {
                  name: 'id',
                  type: 'input',
                  message: 'Please create an ID number'
      
            },
            {
                  name: 'email',
                  type: 'input',
                  message: 'What is your Email?'
      
            },
            {
                  name: 'role',
                  type: 'list',
                  message: 'What type of role do you have?',
                  choices: ['Manager', 'Intern', 'Engineer']
            }
      ]).then(answers => {
            console.log(answers)
            if (answers.role === 'Manager') {
                  inquirer.prompt([
                        {
                              name: 'officeNumber',
                              type: 'input',
                              message: 'What is your office number?'
                        },
                        {
                              name: 'continue',
                              type: 'confirm',
                              message: 'Are you done inputting employees?'
                        }
                  ]).then(role => {
                        answers.officeNumber = role.officeNumber;
                        const manager = new Manager(answers.name, answers.id, answers.email, role.officeNumber);
                        console.log(manager);
                        teamLog.push(manager)
                        // moreTeam(manager)
                        const result = render(teamLog)
                        fs.writeFileSync('employees.html', result)
                        if (role.continue === false) {
                              console.log('Please enter the new employee:')
                              teamQuery()
                        } else {
                              console.log('This is your New Team', teamLog)
                              buildTeam = () => {
                                    fs.writeFileSync(outputPath, render(teamLog), "utf-8")
                              }
                              buildTeam();
                        }          
                  })
            }
            if (answers.role === 'Intern') {
                  inquirer.prompt([
                        {
                              name: 'school',
                              type: 'input',
                              message: 'What is your School Name?'
                        },
                        {
                              name: 'continue',
                              type: 'confirm',
                              message: 'Are you done inputting employees?'
                        }
                  ]).then(role => {
                        answers.school = role.school
                        const intern = new Intern(answers.name, answers.id, answers.email, role.school)
                        teamLog.push(intern)
                        const result = render(teamLog)
                        if (role.continue === false) {
                              console.log('Please enter the new employee:')
                              teamQuery()
                        } else {
                              console.log('This is your New Team', teamLog)
                              buildTeam = () => {
                                    fs.writeFileSync(outputPath, render(teamLog), "utf-8")
                              }
                              buildTeam();
                        }                      
                  })
            }
            if (answers.role === 'Engineer') {
                  inquirer.prompt([
                        {
                              name: 'gitHub',
                              type: 'input',
                              message: 'What is your GitHub Account?'
                        },
                        {
                              name: 'continue',
                              type: 'confirm',
                              message: 'Are you done inputting employees?'
                        }
                  ]).then(role => {
                        console.log(role)
                        answers.gitHub = role.gitHub
                        const engineer = new Engineer(answers.name, answers.id, answers.email, role.gitHub)
                        teamLog.push(engineer)
                        if (role.continue === false) {
                              console.log('Please enter the new employee:')
                              teamQuery()
                        } else {
                              console.log('This is your New Team', teamLog)
                              buildTeam = () => {
                                    fs.writeFileSync(outputPath, render(teamLog), "utf-8")
                              }
                              buildTeam();
                        }                     
                  })
                        
            }
      });
};

teamQuery()

// After the user has input all employees desired, call the `teamQuery` function (required
// above) 
