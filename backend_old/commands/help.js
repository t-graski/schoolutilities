const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    const emoji = client.emojis.cache.get('748653682966528171');
    let date = new Date().toISOString();
    const example = {
        title: 'SchoolUtilities Help',
        description:
            "\nHi, I'm SchoolUtilites help. If you have any questions how to use SchoolUtilities, you are absolutly right here. If you have any issues, you can contact us via [Github](https://github.com/WahlMandat/SchoolUtilities).",
        color: 3066993,
        timestamp: date,
        footer: {
            icon_url: 'https://i.imgur.com/KJ63K3r.png',
            text: 'SchoolUtilities© 2020',
        },
        fields: [
            {
                name: '<:calc:748639112033992715> Calculation Command',
                value:
                    '```You can calulate calculations easily in discord.\n\nExample: .calc 1+1\n\nExtra Information: Square Root: sqrt(x)```',
            },
            {
                name: '<:check:748641460710277170> Check Command',
                value:
                    '```This command is only usable with a teacher role. In case you are a teacher you can check the precense of your students with this command.\n\nExample: .check, .check 1 <-- Time how long students have to confirm their precense.```',
            },
            {
                name: ` ${emoji} Translate Command`,
                value:
                    '```You can simply translate single words or entire sentences to the language you wish.\n\nExample: .translate de Hello, my name is SchoolUtilities```',
            },
            {
                name: '<:config:748662672983064739> Concig Command (ADMIN ONLY and only if you know what you are doing)',
                value:
                    '```Set your student role\nExample: .config student StudentRole\n\nSet your teacher role\nExample: .config teacher TeacherRole\n\nSet your timezone\nExample: .config timezone GMT+2\n\nSet your language\nExample: .config language German\n\nSet your checktime\nThe checktime is the time how long students have time to confirm their precense if there is now time give.\nExample: .config checktime 2\n\nEnable your autochecks\nFurther information about this in the timetable tab.\nExample: .config autocheck enable, .config autocheck disable ```',
            },
            {
                name: '<:timetable:748671257943212092> Timetable command',
                value:
                    '```You can configurate your personal timetable. It allows you to activate automated precense checks and it will send a message when the class starts.\n\nAdd a class\nExample: .config timetable add Mo 8:00 8:50 #MathsChannel Maths\n\nRemove a class\nExample: .config timetable remove Mo 8:00 8:50 #MathsChannel Maths\n\nClear the timetable\nExample: .config timetable clear\n\nPrint the timetable\nExample: .timetable print```',
            },
            {
                name: '<:extrainfo:748675170058764380> Extra information',
                value:
                    'If you experience any issues feel free to create an issue on [Github](https://github.com/WahlMandat/schoolutilities/#creating-issues-on-github), if you dont not know how to create an issues read the [ReadMe](https://github.com/WahlMandat/SchoolUtilities#schoolutilities) there will be an explanation how to create an issues.',
            },
        ],
    };
    message.channel.send({ embed: example });
};
