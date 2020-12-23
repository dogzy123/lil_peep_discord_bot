const Command = require('../classes/command');

const FemRoles = new Command('femRoles', {
    channelId: '565190122795040768',
    emojiRoles: {
        '791067762499518494': 'Феминистка',
        '791068273428398092': 'Злая фемка',
        '791067371648974870': 'Профеминист',
        '❔': 'Интересуюсь'
    },
});

FemRoles.onStartup = function () {
    
};

FemRoles.exec = function () {
    const { channelId, emojiRoles } = this.props;
    const channel = this.client.channels.cache.find( ch => ch.id === channelId );

    this.client.on('message', (m) => {
        if (m.content === `!${this.name}`) {
            if (channel) {
                let rolesMsg = `Эти роли ничего не дают, с их помощью вы просто можете показать всем на чьей вы стороне.\n\nЕсли вы не хотите чтобы кто-нибудь не дай бог подумал что вы считаете женщин за людей, но при этом хотите следить за обсуждениями - нажмите на вопросик.\n`
    
                for (const emojiId in emojiRoles) {
                    const { emojis, roles } = channel.guild;
        
                    const emojiRole = emojiId.length > 1 ? emojis.cache.find( e => e.id === emojiId ) : emojiId;
                    const mentionRole = roles.cache.find( r => r.name === emojiRoles[emojiId] );
        
                    const emoji = emojiRole.name ? `<:${emojiRole.name}:${emojiRole.id}>` : emojiRole;
        
                    rolesMsg += `\n${emoji} - ${mentionRole}`;
                }
        
                channel.send(rolesMsg).then( (msg) => {
                    for (const key in emojiRoles) {
                        msg.react(key);
                    }
                } );
            }
        }
    });
    
    const handleReaction = (type, user, reaction) => {
        if (reaction.message.channel.id === channelId && user.id !== "547832309173321739") {
            const { guild } = reaction.message;
            const member = guild.members.cache.find( m => m.id == user.id );
            const emojiRole = emojiRoles[reaction._emoji.id || reaction._emoji.name];

            if (!emojiRole) return;
            const actualRole = guild.roles.cache.find( role => role.name === emojiRole ); 

            if (member) {
                if (type === 'add') {
                    member.roles.add(actualRole);
                } else {
                    member.roles.remove(actualRole);
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

module.exports = FemRoles;