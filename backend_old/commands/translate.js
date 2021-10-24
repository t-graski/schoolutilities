const { langs } = require('../misc/languages.js');
const translate = require('google-translate-free');
const { MessageEmbed, Message } = require('discord.js');

function getLanguage(code) {
    let returnProperty = false;
    for (const key in langs) {
        if (langs.hasOwnProperty(key)) {
            const element = langs[key];
            if (key == code.toLowerCase() || code.toLowerCase() == element.toLowerCase()) {
                returnProperty = element;
            }
        }
    }
    return returnProperty;
}

exports.run = async (client, message, args) => {
    // // Get all arguments and turn them into one string
    // let translateText = args.slice(1).reduce((a, b) => a + ' ' + b);

    // console.log(await 
    //     translate(translateText, { to: args[0] }));

    // // Use google-translate-free npm package to translate the input text to another language
    // translate(translateText, { to: args[0] })
    //     .then((res) => {
    //         // Create discord embed message
    //         const embed = new MessageEmbed()
    //             .setTitle(`Translation (${getLanguage(res.from.language.iso)} -> ${getLanguage(args[0])}) `)
    //             .setColor('#4BB543')
    //             .setDescription(`**${res.text}**`)
    //             .setTimestamp()
    //             .setFooter('SchoolUtilities© 2020', 'https://i.imgur.com/KJ63K3r.png');
    //         // Send discord message
    //         message.channel.send(embed);
    //     })
    //     .catch((err) => {
    message.reply('This feature is temporary disabled.');
        // });
};
