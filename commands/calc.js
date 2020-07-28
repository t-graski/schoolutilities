const { MessageEmbed } = require('discord.js');
const { evaluate } = require('mathjs');

exports.run = (client, message, args) => {
    let result = evaluate(args[0]);
    
    const embed = new MessageEmbed()
        .setColor('#4BB543')
        .setTitle('Calculation')
        .setDescription(`The calculation **${args[0]}** results: **${result}**.`)
        .setTimestamp()
        .setFooter('SchoolUtilities© 2020', 'https://i.imgur.com/KJ63K3r.png');
    message.channel.send(embed);

}