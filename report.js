const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = (client, command) => {
    const redirectChannelId = '547544838074138674';

    client.on('message', (msg) => {
        if (msg.content.startsWith(`!${command}`)) {
            const [cmd, user, txt] = msg.content.split(' ');
           // console.log(msg);
            const author = msg.author.username;
            const target = msg.mentions.users.first().username;

            const redirectChannel = client.channels.cache.find( ch => ch.id === redirectChannelId );

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