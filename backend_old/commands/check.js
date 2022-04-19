const { MessageEmbed } = require('discord.js');
const { serverConfiguration } = require('../misc/utils.js');

exports.run = async (client, message, args) => {
    let configData = serverConfiguration(message.channel.guild.id);
    if (configData) {
        if (message.member.hasPermission('ADMINISTRATOR') ||
            message.member.roles.cache.has(configData.teacherId)) {
            let checkTime = configData.checkTime;
            if (args[0]) {
                let arg = args[0];
                if (isNumeric(arg)) {
                    checkTime = Math.abs(arg);
                } else {
                    message.channel.send(`"${arg}" is not a valid number."`);
                    return false;
                }
            }

            let guildMembers = await message.guild.members.fetch();
            let discordMessage = new MessageEmbed()
                .setTitle('Precense check')
                .setColor('#4BB543')
                .setDescription(`Please react in the next ${checkTime} minutes with ✔  to confirm the precense.`)
                .setTimestamp()
                .setFooter('SchoolUtilities© 2020', 'https://i.imgur.com/KJ63K3r.png');

            message.channel.send(discordMessage).then((embed) => {
                embed.react('✔');

                const filter = (reaction, user) => {
                    return reaction.emoji.name === '✔' && user.id === embed.author.id;
                };

                embed.awaitReactions(filter, { max: 9999, time: checkTime * 60000, error: ['time'] })
                    .then((collected) => {
                        let coll = collected.first().users;
                        let reactions = Array.from(coll.cache).slice(1);
                        let reactedUsers = new Array();
                        reactions.map((element) => {
                            reactedUsers.push(element[1].id);
                        });

                        let studentIdArray = [configData.studentId];
                        let students = guildMembers.filter((member) => member._roles.some((role) => studentIdArray.includes(role))).map(person => person.user.id);
                        students = students.filter(userId => !reactedUsers.includes(userId));

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

                        let userReactions = embed.reactions.cache.filter((reaction) => reaction.users.cache.has('737357503989415956'));
                        try {
                            for (const reaction of userReactions.values()) {
                                reaction.users.remove('737357503989415956');
                            }
                        } catch (e) {

                        }
                    })
            })
        }
    }
}

function isNumeric(value) {
    return !isNaN(value);
}

