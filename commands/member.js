exports.run = async (client, message, args) => {
    let roleInput = args.slice(0).reduce((a, b) => a + ' ' + b);
    let regex = /<@&[0-9]+>/;
    let name;

    if (regex.test(roleInput)) {
        name = message.guild.roles.cache.find((r) => r.id === roleInput.replace(/[^\d]/g, ''));
        console.log(name.id);
    } else {
        name = message.guild.roles.cache.find((role) => role.name.toLowerCase() === roleInput.toLowerCase());
        console.log(name.id);
    }

    console.log(message.guild.roles.cache.get(name.id).members.map((m) => m.user.username));
    let members = await message.guild.members.fetch();
    console.log(members);
};
