const { MessageEmbed } = require('discord.js');
const { evaluate } = require('mathjs');
const numeral = require('numeral');

exports.run = async (client, message, args) => {
    let error = false;
    let calculation;
    let result;
    try {
        // Get all arguments and turns them into one string
        calculation = args.slice(0).reduce((a, b) => a + b);
        result = evaluate(calculation);
    } catch (e) {
        error = true;
    }
    let resultString = result + '';
    let commaLength = resultString.includes('.') ? resultString.split('.')[1].length : 0;
    result = numeral(result).format('0,0.' + '0'.repeat(commaLength > 10 ? 10 : commaLength));
    // Create and send a discord message
    const embed = new MessageEmbed()
        .setColor(error ? '#FF0000' : '#4BB543')
        .setTitle('Calculation')
        .setDescription(
            error ? `There are **invalid charactars** in the calculation!` : `The calculation **${calculation}** results: **${result}**.`
        )
        .setTimestamp()
        .setFooter('SchoolUtilities© 2020', 'https://i.imgur.com/KJ63K3r.png');
    message.channel.send(embed);
};
