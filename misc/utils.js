let config = require('../datastore/configs.json');
const fs = require('fs');
function serverConfiguration(guildId) {
    return config.find((element) => Number(guildId) == element.guildId);
}
function save(path, string) {
    fs.writeFile(path, string, (err) => {
        console.log(err ? err : '');
    });
}

module.exports.serverConfiguration = serverConfiguration;
module.exports.save = save;
