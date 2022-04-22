#!/usr/bin/env node
const fs = require("fs");

require('coa').Cmd() // main (top level) command declaration
    .name(process.argv[1]) // set top level command name from program name
    .title('My awesome command line util') // title for use in text messages
    .helpful() // make command "helpful", i.e. options -h --help with usage message
    .end() // end option chain and return to main command

    // actions

    .cmd() // inplace subcommand declaration
    .name('create').title('Create component template').helpful()
    .opt()
    .name('name').title('input file, required')
    .short('c').long('create component')
    .val(function(component, template) {
        let route = 'app/components/' + component + '/' + template, // путь
            files = {
                html : {
                    fileName : 'template.html',
                    fileContent : '<div class="'+ template +'"></div>'
                },
                scss :  {
                    fileName : 'style.scss',
                    fileContent : '.' + template + ' {}'
                },
                js   : {
                    fileName : 'script.js',
                    fileContent : '$(function(){});'
                }
            },  // создаваемые файлы, и их содержимое
            messages = {
                errorComponentName : 'Введите название компонента',
                errorTemplateName  : 'Введите название шаблона',
                success            : 'Шаблон ' + template + ' компонента ' + component + ' создан',
                pathInclude        : "Путь подключения на страницу: @@include('../components/" + component + "/"+ template +"/template.html')"
            } // сообщения
        if (!component) {
            console.log(messages.errorComponentName)
        } else if (!template) {
            console.log(messages.errorTemplateName)
        } else {
            fs.mkdir(route, {recursive: true}, err => { //создать папку
                if (err) throw err;
                for(let index in files) {
                    let file = files[index];
                    fs.writeFile(route + '/' + file.fileName, file.fileContent, err => {
                        if (err) throw err;
                    });
                }
                console.log(messages.success);
                console.log(messages.pathInclude);
            });
        }
    })
    .req() // make option required
    .end() // end option chain and return to command
    .end() // end subcommand chain and return to parent command
    .run(process.argv.slice(2)); // parse and run on process.argv