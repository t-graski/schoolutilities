const { langs } = require('../languages.js');
const translate = require('google-translate-free');
const { MessageEmbed, Message } = require('discord.js');

function getLanguage(code) {
    let returnProperty = false;
    for (const key in langs) {
        if (langs.hasOwnProperty(key)) {
            const element = langs[key];
            if (key == code || code == element.toLowerCase()) {
                returnProperty = element;
            }
        }
    }
    return returnProperty;
}

exports.run = async (client, message, args) => {
    let translateText = args.slice(1).reduce((a, b) => a + " " + b);

    translate(translateText, { to: args[0] }).then(res => {
        const embed = new MessageEmbed()
            .setTitle(`Translation (${getLanguage(res.from.language.iso)} -> ${getLanguage(args[0])}) `)
            .setColor('#4BB543')
            .setDescription(`**${res.text}**`)
            .setTimestamp()
            .setFooter('SchoolUtilities© 2020', 'https://i.imgur.com/KJ63K3r.png');
        message.channel.send(embed);


    }).catch(err => {
        message.reply("This language is not supported yet.");
    });
}
