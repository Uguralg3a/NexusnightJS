const { PermissionsBitField } = require('discord.js');
const db = require('../../models/warns')

module.exports = {
    name : 'remove-warn',
    run : async(client, message, args) => {
        if(!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.channel.send('You do not have permission to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('User not found.')
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send('Warn wurde Gelöscht')
                data.save()
            } else {
                message.channel.send('Dieses Mitglied hat keine Verwarnungen auf diesem Server!!')
            }
        })
    }
}