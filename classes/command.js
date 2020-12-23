class Command {
    constructor(name, props) {
        this.name = name;
        this.props = props;
    }

    register(client, commands) {
        this.client = client;
        this.commands = commands;

        if (this.hasOwnProperty('onStartup') && typeof this.onStartup === 'function') {
            this.onStartup();
        }
        // let valid = true;

        // commands.forEach( cmd => {
        //     if (cmd.name === this.name) {
        //         valid = false;
        //     }
        // } );

        // if (!valid) {
        //     throw new Error('Name already in use');
        // }

        // return validName;
    }

    exec () {}
}

module.exports = Command;