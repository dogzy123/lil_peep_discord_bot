const { Client } = require('discord.js');
const client = new Client();

require('dotenv').config();

// modules
const Help = require('./commands/help');
const ReactRoles = require('./commands/reactRoles');
const Report = require('./commands/report');

// main
const generateCommands = (commands) => {
    commands.forEach( (command) => {
        try {
            command.register(client, commands);
            command.exec();
        } catch (e) {
            console.error(`Failed to register command: ${command.name}: ${e}`);
        }
    } );
};

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is now online!`);

    generateCommands([
        Help,
        Report,
        ReactRoles
    ]);
});

// login bot
client.login(process.env.BOT_TOKEN);