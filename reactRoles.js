const { MessageEmbed } = require('discord.js');

module.exports = (client) => {
    const rolesChannelId = '565190122795040768';
    const emojiRoles = {
        '790691917381763082': 'Apex Legends',
        '790690564685037588': 'Overwatch',
        '790691806799069235': 'Paladins',
        '790691966882021406': 'GTA 5',
        '790692062097702932': 'Dota 2',
        '790692107144790026': 'PUBG',
        '790692141142638592': 'Rust',
        '790692167790100510': 'Minecraft',
        '790692197284184066': 'Fortnite',
        '790692264028012564': 'Rainbow Six Siege',
        '790692851213926441': 'Sea of Thieves',
        '790692231140081704': 'Dead by Daylight',
        '790692460258131998': 'Raft',
    };

    const clearChannel = async (channel) => {
        try {
            const messages = await channel.messages.fetch();
            messages.map( msg => channel.messages.delete(msg) );
        } catch (e) {
            return Promise.reject(e);
        }
    };

    client.on('message', (msg) => {
        if (msg.channel.id === rolesChannelId) {
            if (msg.content === "!roles") {
                clearChannel(msg.channel).catch(e => console.error(e));

                const rolesMsg = new MessageEmbed();
                rolesMsg
                    .setColor('PURPLE')
                    .setTitle('Тут можно выбрать "роли".')
                    .setDescription(
                        `Их можно использовать для того чтобы было проще найти напарницу для игры. 
                        Так же их можно отмечать(@название_игры), когда хочется поделиться какой-то новостью или появляется желание обсудить что-либо связанное с игрой. Так люди выбравшие эту игру будут уведомлены, что вы ее упомянули.
                    `);

                msg.channel.send(rolesMsg)
                    .then( (thisMsg) => {
                        for (const key in emojiRoles) {
                            thisMsg.react(key);
                        }
                    } );
                
                msg.channel.send(`
                    ___Если вы хотите чтобы мы добавили какую-то игру - напишите ее название и прикрепите картинку с ее лого в **книгу жалоб и предложений**.___
                `);
            }
        }
    });
    
    const handleReaction = (action, user, reaction) => {
        if (reaction.message.channel.id ===  rolesChannelId && user.id !== "547832309173321739") {
            const { guild } = reaction.message;
            const emojiRole = emojiRoles[reaction._emoji.id];
            console.log(emojiRole);
            if (!emojiRole) return;
            
            const actualRole = guild.roles.cache.find( role => role.name === emojiRole ); 
            console.log(actualRole);
            const member = guild.members.cache.find( member => member.id === user.id );
            if (action === 'add') {
                member.roles.add(actualRole)
            } else {
                member.roles.remove(actualRole);
            }
        }
    }

    client.on('messageReactionAdd', (reaction, user) => {
        handleReaction('add', user, reaction);
    });

    client.on('messageReactionRemove', (reaction, user) => {
        handleReaction('remove', user, reaction);
    });
};