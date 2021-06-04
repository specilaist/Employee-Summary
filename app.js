const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamLog = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function teamQuery() {
  
  startQuestion = () => {
    inquirer.prompt([
      {
        name: "initiate",
        type: "confirm",
        message: "Would you like to create a team?"
      }
    ]).then(answer => {
      switch(answer.initiate) {
        case true:
          createManager();
          break;
        case false:
          text = "Have a nice day!";
          break;
      }
    });
  }

  startQuestion();

  createManager = () => {
    inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "Please start with the Manager's name",
      },
      {
        name: "id",
        type: "input",
        message: "Please create an ID number",
      },
      {
        name: "email",
        type: "input",
        message: "What is your Email?",
      },
      {
        name: "officeNumber",
        type: "input",
        message: "What is your office number?",
      },
      {
        name: "continue",
        type: "confirm",
        message: "Are you done inputting employees?",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      console.log(manager);
      teamLog.push(manager);
      if (answers.continue === true) {
        renderTeam();
      } else {
        addTeam();
      }
  });
  };

  createIntern = () => {
    inquirer
          .prompt([
            {
              name: "name",
              type: "input",
              message: "Please type the Intern's name."
            
            },
            {
              name: "id",
              type: "input",
              message: "Please type the Intern's Id."
            },
            {
              name: "school",
              type: "input",
              message: "What is your School Name?",
            },
            {
              name: "email",
              type: "input",
              message: "What is your Email?",
            },
            {
              name: "continue",
              type: "confirm",
              message: "Are you done inputting employees?",
            },
          ])
          .then(intern => {
            const newIntern = new Intern(intern.name, intern.id, intern.school, intern.email)
            teamLog.push(newIntern)
            if (intern.continue === true) {
              console.log("This is your new team:", teamLog);
              renderTeam();
            } else {
              addTeam();
            }
          })
  };

  createEngineer = () => {
    inquirer
          .prompt([
            {
              name: "name",
              type: "input",
              message: "Please type the Engineer's name."
            
            },
            {
              name: "id",
              type: "input",
              message: "Please type the Engineer's Id."
            },
            {
              name: "github",
              type: "input",
              message: "What is your Github address?",
            },
            {
              name: "email",
              type: "input",
              message: "What is your Email?",
            },
            {
              name: "continue",
              type: "confirm",
              message: "Are you done inputting employees?",
            },
          ])
          .then(engineer => {
            const newEngineer = new Engineer(engineer.name, engineer.id, engineer.school, engineer.email)
            teamLog.push(newEngineer)
            if (intern.continue === true) {
              console.log("This is your new team:", teamLog);
              renderTeam();
            } else {
              addTeam();
            }
          })
  };

  addTeam = () => {
    inquirer.prompt([
      {
        type: "confim",
        name: "addMember",
        message: "Are you sure you want to create another employee?"
      },
      {
        type: "list",
        name: "memberChoice",
        message: "Which kind of employee would you like to add?",
        choices: [
          "Intern",
          "Engineer",
          "I want to make another manager",
          "I DON'T want to add another team member"
        ]
      }
    ]).then(makeMember => {
      switch(makeMember.memberChoice) {
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        case "I want to make another manager":
          createManager();
          break;
        default:
          buildTeam();
      }
    })
  };

  renderTeam = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamLog), "utf-8");
  }
};

teamQuery();

// After the user has input all employees desired, call the `teamQuery` function (required
// above)
