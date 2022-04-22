// подключение модулей node
const fs       = require('fs');
// создание пустых компонентов
function createPage(pageName, pageTitle) {
    let route = 'app/pages/', // путь
        file = {
            pageFile : pageName + '.twig',
            pageContent : '{% set page_data = {title : ' + pageName + ',page  : '+ pageTitle+ '} %}{% include "../header.twig" %} <div class="section"> </div>{% include "../footer.twig" %}'
        },  // создаваемые файлы, и их содержимое
        messages = {
            errorPageName : 'Введите название страницы',
            errorPageTitle  : 'Введите заголовок страницы',
            success            : 'Страница ' + pageName + ' создана',
        } // сообщения
    if (!pageName) {
        console.log(messages.errorPageName)
    } else if (!pageTitle) {
        console.log(messages.errorPageTitle)
    } else {
        fs.writeFile(route + '/' + file.pageFile, file.pageContent, err => {
            if (err) throw err;
        });
    }
}

module.exports.createPage = createPage