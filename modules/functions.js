// подключение модулей node
const fs       = require('fs');
// создание пустых компонентов
function createComponent(component, template) {
    let route = 'app/components/' + component + '/' + template, // путь
        files = {
            html : {
                fileName : 'template.twig',
                fileContent : `<div class="`+ template +`">

                </div>`
            },
            scss :  {
                fileName : 'style.scss',
                fileContent : `.` + template + ` {
                
                 }`
            },
            js   : {
                fileName : 'script.js',
                fileContent :`$(function(){
                
                });`
            }
        },  // создаваемые файлы, и их содержимое
        messages = {
            errorComponentName : 'Введите название компонента',
            errorTemplateName  : 'Введите название шаблона',
            success            : 'Шаблон ' + template + ' компонента ' + component + ' создан',
            pathInclude        : "Путь подключения на страницу: {% include '../components/" + component + "/"+ template +"/template.twig' %}"
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
}

module.exports.createComponent = createComponent