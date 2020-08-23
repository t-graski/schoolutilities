const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    const embed = new MessageEmbed()
        .setTitle('SchoolUtilities Help')
        .setColor('#4BB543')
        .setDescription(`Hi, I'm  SchoolUtilities' help. If you've any questions how to use the bot, you are absolutly right here.`)
        .addField(`In case you need extra help you can contact us via ******`)
        .addField(
            '**.calc** Command',
            `You can calculate calcuations easily in discord.\n Example: .calc 1+1\n Extra Information: Square Root: sqrt(x)`,
            true
        )
        .addField('**.check Command**', `You can simply check if every user with a certain role, which is configurated is precent.`, true)
        .setTimestamp()
        .setFooter('SchoolUtilities© 2020', 'https://i.imgur.com/KJ63K3r.png');

    message.channel.send(embed);
    //     message.reply(`
    // Hi, I'm  SchoolUtilities' help. If you've any questions how the commands work or how you should write them, you are right here.
    // So here are the commands:

    // Calculation function:
    // The calc funtion helps you calculate calculations easy in discord.

    // How it works?
    // Simply write .calc and then add the calculation:
    // .calc 1+1

    // Server configuration:
    // With the server configuration you can configure the server settings, please do this befor you use the other commands, because most of them won't work without configuration. Important: All .config commands must be written in the bot-config channel, this channel was auto-generated from the bot.

    // .config student <studentRole>
    // With this command you can set the student role.
    // For example you have the role student and want to set this role as the student role, then you have to write:
    // .config student student

    // .config teacher <teacherRole>
    // This is the same command as the student command above(only for teachers), check it out there.

    // .config timezone <timezone>
    // Not implemented yet.

    // .config language <language>
    // Not implemented yet.above

    // .config checktime <checktime>
    // With the checktime you can set, how long the check command should wait, until he sends the results. So if you want the check commant wait 3min, you have to write the following command:
    // .config checktime 3
    //     `);
};
