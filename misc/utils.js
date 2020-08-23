let config = require('../datastore/configs.json');
function serverConfiguration(guildId) {
    return config.find((element) => Number(guildId) == element.guildId);
}

module.exports.serverConfiguration = serverConfiguration;
