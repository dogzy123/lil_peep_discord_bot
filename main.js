const { Client } = require('discord.js');
const client = new Client();

// modules
const help = require('./help');
const reactRoles = require('./reactRoles');
const report = require('./report');

// commands
const commands = {
    'help': "Get all commands",
    'roles': "Generate roles",
    'report': "Report user (!report @user text/img)"
};

// main
client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is now online!`);
    help(client, commands);

    reactRoles(client, commands.roles);
    report(client, 'report');
});

// login bot
client.login('NTQ3ODMyMzA5MTczMzIxNzM5.XG2OmA.6e6Dz0gX-S-nK1VU99vPccCmWsM');