const db = require('../../models/warns')
const { Message, EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    name :'warns',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.channel.send('You do not have permissions to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('User nicht gefunden.')
        const reason = args.slice(1).join(" ")
        
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {

            const e = new EmbedBuilder()
            .setTitle(`${user.user.tag}'s warns`)
            .setDescription( 
                data.content.map(
                    (w, i) => 
                    `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}`
                ).toString()                    )
            if(err) throw err;
            if(data) {
                message.channel.send({
                    embeds: [e]
                }
                )
            } else {
                message.channel.send('User hat keine Daten!')
            }

        })
    }
}