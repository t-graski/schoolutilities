let DiscordJS = require('discord.js')
const dotenv = require('dotenv')
dotenv.config();

const client = new DiscordJS.Client({
    intents: [DiscordJS.Intents.FLAGS.GUILDS, DiscordJS.Intents.FLAGS.GUILD_MESSAGES]
});

client.on('ready', () => {
    console.log('Bot started!');

    const guildId = '676831877025497108';
    const guild = client.guilds.cache.get(guildId);
    let commands;


    if (guild) {
        commands = guild.commands;
    } else {
        commands = client.application?.commands;
    }

    commands?.create({
        name: 'ping',
        description: 'Pong!',
    })

    commands?.create({
        name: 'add',
        description: 'Add two numbers',
        options: [
            {
                name: 'x',
                description: 'First number',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'y',
                description: 'Second number',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            }
        ]
    })

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand) return;

        const { commandName, options } = interaction;

        if (commandName === 'ping') {
            interaction.reply({
                content: 'Pong!',
                ephemeral: true,
            });
        } else if (commandName === 'add') {
            const x = options.getNumber('x') || 0;
            const y = options.getNumber('y') || 0;

            await interaction.deferReply({
                ephemeral: true,
            })

            await new Promise(resolve => setTimeout(resolve, 5000));

            interaction.editReply({
                content: `${x} + ${y} = ${x + y}`,
            });
        }
    });
})

client.login(process.env.TOKEN);