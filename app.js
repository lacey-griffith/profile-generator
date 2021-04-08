const inquirer = require('inquirer')
// const fs = require('fs')
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github)

// fs.writeFile('./index.html', pageHTML , err => {
//     if (err) throw err;
//     console.log('Portfolio Complete! Check out index.html to see the output!')
// });
const promptUser = () => {
    return inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username:'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ])
};

const promptProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
    =================
    Add a New Project
    =================
    `);
    return inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        }, {
            type: 'input',
            name: 'description',
            message: 'Provide a description of your project. [Required]'
        }, {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with?',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'BootStrap', 'Node']
        }, {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link for your project. [Required]'
        }, {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        }, {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to add another project?',
            default: false
        }])
        .then(projectData => {
            portfolioData.projects.push(projectData)
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData)
            } else {
                return portfolioData
            }
        })
}

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });