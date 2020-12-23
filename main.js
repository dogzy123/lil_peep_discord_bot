const { Client } = require('discord.js');
const client = new Client();

require('dotenv').config();

// modules
const Help = require('./commands/help');
const ReactRoles = require('./commands/reactRoles');
const Report = require('./commands/report');
const MaleRole = require('./commands/maleRole');
const FemRoles = require('./commands/femRoles');

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

    const setTrack = (name) => {
        client.user.setPresence({
            activity: {
                name: `Lil Peep - ${name}`,
                type: 'LISTENING',
            },
            status: 'dnd',
        });
    };

    const tracks = ['Star Shopping', 'Save That Shit', 'withcblades', 'Beamer Boy', 'crybaby', 'nineteen', 'Benz Truck', 'The Brightside', 'Awful Things', 'Broken Smile', '16 Lines'];

    const trackName = tracks[Math.floor(Math.random() * tracks.length)];
    const duration = 3 * (1000 * 60);

    setInterval( () => {
        setTrack(tracks[Math.floor(Math.random() * tracks.length)]);
    },  duration);

    setTrack(trackName);

    generateCommands([
        Help,
        Report,
        ReactRoles,
        MaleRole,
        FemRoles,
    ]);
});

// login bot
client.login(process.env.BOT_TOKEN);