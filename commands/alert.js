const { serverConfiguration } = require('../misc/utils.js');

exports.run = async (client, message, args) => {
    let serverConfigurationData = serverConfiguration(message.guild.id);
    if (serverConfigurationData) {
        if (message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.has(serverConfigurationData.teacherId)) {
            if (args.length) {
                let studentId = serverConfigurationData.studentId;
                // Get all members of the student role, which is configurated in configs.json
                let students = message.guild.roles.cache.get(studentId).members.map((m) => m.user.id);

                // Get all arguments and turns them into one string
                let msg = args.slice(0).reduce((a, b) => a + ' ' + b);

                // Go through all students and sends them a private message
                students.forEach((user) => {
                    client.users.cache.get(user).send(`${message.author} sent you the message:\n**${msg}**`);
                });
            }
        }
    }
};
