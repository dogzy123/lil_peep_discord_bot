const { Client } = require('discord.js');
const client = new Client();

require('dotenv').config();

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
client.login(process.env.BOT_TOKEN);