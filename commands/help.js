const Command = require('../classes/command');

const Help = new Command("help", {
    description: "This command shows the list of all available commands",
    adminChannelId: "547544838074138674",
});

Help.exec = function() {
    const { adminChannelId } = this.props;

    this.client.on('message', (msg) => {
        if (msg.channel.id === adminChannelId && msg.content === `!${this.name}`) {
            let commandsText = '';

            this.commands.forEach( command => {
                commandsText += `!${command.name} - ${command.props.description}\n`;
            } );

            msg.channel.send(commandsText);
        }
    });
};

module.exports = Help;