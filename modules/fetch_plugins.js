const fs = require('fs');
const exec = require('child_process').exec;
let nodeModules = fs.readdirSync('node_modules', 'utf-8');
let pluginsList = (JSON.parse(fs.readFileSync('package.json','utf-8'))).devDependencies;
let routes = {
    nodeModulesPath : process.cwd() + '/node_modules/',
    pluginsDirPath  : process.cwd() + '/app/plugins/'
}
let counter = 1;
nodeModules.forEach(function (module) {
    let modulePath = routes.nodeModulesPath + module;
    for(let plugin in pluginsList) {
        let checkPluginName = (plugin.indexOf(module) !== -1 || module.indexOf(plugin) !== -1)  && module.length > 1;
        if(checkPluginName) {
            fs.stat(routes.pluginsDirPath + module, function (err,status) {
                if(!status) {
                    console.log('try copy ' + plugin);
                    exec('cp -r ' + modulePath +' '+ routes.pluginsDirPath + module, function (err) {
                        if(err) throw err;
                    })
                    console.log(plugin + ' success copied');
                    console.log(counter++ + '/' + Object.keys(pluginsList).length + ' plugins copied');
                } else {
                    console.log(plugin + ' in directory')
                }
            });
        }
    }
});
