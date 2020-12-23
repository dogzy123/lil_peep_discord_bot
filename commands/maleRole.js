const Command = require('../classes/command');

const MaleRole = new Command('maleRole', {
    channelId: '790394922846650398',
    msgId: '790687482919911484',
});

MaleRole.onStartup = async function () {
    const { channelId, msgId } = this.props;
    const channel = this.client.channels.cache.find( ch => ch.id === channelId );

    if (channel) {
        const messages = await channel.messages.fetch();
        const msg = messages.find( m => m.id === msgId );

        if (msg) {
            msg.react('♂️');
        }
    }

    const handleReaction = (type, user, reaction) => {
        if (reaction.message.channel.id === channelId && user.id !== "547832309173321739") {
            const { guild } = reaction.message;
            const member = guild.members.cache.find( m => m.id == user.id );
            const role = guild.roles.cache.find( r => r.name === 'Мужчина' );

            if (member) {
                if (type === 'add') {
                    member.roles.add(role).catch(e => console.error(e));
                } else {
                    member.roles.remove(role);
                }
            }
        }
    };

    this.client.on('messageReactionAdd', (reaction, user) => {
        handleReaction('add', user, reaction);
    });

    this.client.on('messageReactionRemove', (reaction, user) => {
        handleReaction('remove', user, reaction);
    });
};

module.exports = MaleRole;