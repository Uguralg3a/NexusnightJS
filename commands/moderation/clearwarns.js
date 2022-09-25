const { PermissionFlagsBits, PermissionsBitField } = require('discord.js');
const db = require('../../models/warns')

module.exports = {
    name : 'remove-all-warns',
    run : async(client, message, args) => {
        if(!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.channel.send('You do not have permission to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('User not found.')
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                message.channel.send(`${user.user.tag}'s verwarnungen wurden erfolgreich gelöscht!`)
            } else {
                message.channel.send('Dieses Mitglied hat keine Verwarnungen auf diesem Server!')
            }
        })
    }
}