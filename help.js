module.exports = (client, commands) => {
    const adminChannelId = '547544838074138674';

    client.on('message', (msg) => {
        if (msg.channel.id === adminChannelId && msg.content === `!${Object.keys(commands)[0]}`) {
            let commandsText = '';

            for (let command in commands) {
                commandsText += `!${command} - ${commands[command]}\n`;
            }

            msg.channel.send(commandsText);
        }
    });
};