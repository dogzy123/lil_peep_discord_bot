const { MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../classes/command');

const Report = new Command('report', {
    description: 'Allows you to report user (!report @name text/img)',
    redirectChannelId: '547544838074138674',
});

Report.exec = function () {
    const { redirectChannelId } = this.props;

    this.client.on('message', (msg) => {
        if (msg.content.startsWith(`!${this.name}`)) {
            const [cmd, user, txt] = msg.content.split(' ');

            const author = msg.author.username;
            const mention = msg.mentions.users.first();
            const target = mention ? mention.username : null;

            const redirectChannel = this.client.channels.cache.find( ch => ch.id === redirectChannelId );

            if (redirectChannel) {
                const reportMsg = new MessageEmbed();
                const attachment = msg.attachments && msg.attachments.size > 0 ? msg.attachments.first() : null;
                reportMsg
                    .setColor("RED")
                    .setTitle('USER REPORT')
                    .setDescription(`
                        **Author:** ${author}
                        **Target:** ${target}
                        **Subject:** ${txt ? txt : attachment ? "Image attached" : txt || ''}
                    `);

                if (attachment) {
                    reportMsg.setImage(new MessageAttachment(attachment.url).attachment);
                }

                redirectChannel.send(reportMsg)
                    .then( () => {
                        if (attachment) {
                            redirectChannel.send(attachment);
                        }
                        msg.channel.messages.delete(msg);
                    } );
            }
        }
    });
};

module.exports = Report;