exports.run = async (client, message, args) => {
    // let roleInput = args.slice(0).reduce((a, b) => a + ' ' + b);
    // let regex = /<@&[0-9]+>/;
    // let name;

    // if (regex.test(roleInput)) {
    //     name = message.guild.roles.cache.find((r) => r.id === roleInput.replace(/[^\d]/g, ''));
    //     console.log(name.id);
    // } else {
    //     name = message.guild.roles.cache.find((role) => role.name.toLowerCase() === roleInput.toLowerCase());
    //     console.log(name.id);
    // }

    let users = new Array();
    const guild = message.guild;
    let roles = ["748583647900336158"];

    let guildMembers = await guild.members.fetch();
    let roleUserNames = guildMembers.filter((member) => member._roles.some((role) => roles.includes(role))).map(person => person.user.username);
    console.log(roleUserNames);
};
