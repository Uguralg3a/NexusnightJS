const db = require('../../models/warns')
const { Message, PermissionsBitField, EmbedBuilder } = require('discord.js')

module.exports = {
    name :'warn',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.channel.send('You do not have permissions to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('User nicht gefunden.')
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });

        const warnu = new EmbedBuilder()
        .setTitle("Warn")
            .setDescription(`Du wurdest für ${reason} gewarnt`)

        const warnc = new EmbedBuilder()
        .setTitle("Warn")
            .setDescription(`${user} wurde für ${reason} gewarnt!`)

        /*user.send({
            embeds: [warnu]
        }
        )*/
        message.channel.send({
            embeds:[warnc]
        }
        )
    }
}