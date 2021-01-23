const { MessageEmbed } = require('discord.js');
const { serverConfiguration } = require('../misc/utils.js');

exports.run = async (client, message, args) => {
    let serverConfigurationData = serverConfiguration(message.guild.id);
    if (serverConfigurationData) {
        if (message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.has(serverConfigurationData.teacherId)) {
            let checkTime;
            if (args[0]) {
                if (!Number.isNaN(Number(args[0]))) {
                    checkTime = Number(args[0]);
                } else {
                    message.channel.send(`"${args[0]}" is not a valid number.`);
                }
            } else {
                checkTime = serverConfigurationData.checktime;
            }


            let embed = new MessageEmbed()
                .setTitle('Precense check')
                .setColor('#4BB543')
                .setDescription(`Please react in the next ${checkTime} minutes with ✔  to confirm the precense.`)
                .setTimestamp()
                .setFooter('SchoolUtilities© 2020', 'https://i.imgur.com/KJ63K3r.png');
            message.channel.send(embed).then((sentEmbed) => {
                sentEmbed.react('✔');
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '✔' && user.id === sentEmbed.author.id;
                };

                sentEmbed
                    .awaitReactions(filter, { max: 9999, time: checkTime * 60000, error: ['time'] })
                    .then((collected) => {
                        let coll = collected.first().users;
                        let reactions = Array.from(coll.cache).slice(1);
                        reactions.map((element) => {
                            element[1].id;
                        });
                        let studentId = serverConfigurationData.studentId;
                        let students = message.guild.roles.cache.get(studentId).members.map((m) => m.user.id);
                        students.filter(studentId => !reactions.includes(studentId));
                        students = students.map(id => {
                            return `<@${id}>`;
                        });
                        let missingStudents = new MessageEmbed()
                            .setTitle(students.length ? 'Missing students' : 'Yay, no missing students')
                            .setColor(students.length ? '#e50000' : '#4BB543')
                            .setDescription(students)
                            .setTimestamp()
                            .setFooter('SchoolUtilities© 2020', 'https://i.imgur.com/KJ63K3r.png');
                        message.channel.send(missingStudents);
                        let userReactions = sentEmbed.reactions.cache.filter((reaction) => reaction.users.cache.has('737357503989415956'));
                        try {
                            for(const reaction of userReactions.values()) {
                                reaction.users.remove('737357503989415956');
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            });
        }
    } else {
        message.channel.send("Your server hasn't been configured, please configure the bot. Type .help to see the available commands.");
    }
};
