const { Message } = require('discord.js');
const {PermissionsBitField} = require('discord.js')

module.exports = {
  name: 'lock',
  description: 'Locks a channel',
  UserPerms: ['MANAGE_CHANNELS'],
  BotPerms: ['MANAGE_CHANNELS'],
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   * @returns 
   */
  run: async (client, message, args) => {
    const channel = message.channel || message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find((u) => u.name === args[0])
    const selfMember = message.member;
    if (!channel) return message.reply({ content: 'I could not find that channel.'})

    let msg = await message.channel.send({ content: 'Locking...'})
    if(selfMember.permissions.has(PermissionsBitField.Flags.Administrator)) {

    try {
      channel.permissionOverwrites.edit(message.guild.roles.cache.find( (e) => e.name.toLowerCase().trim() === "@everyone" ),
      {
        SendMessages: false,
        AddReactions: false,
      })
      msg.edit({ content: `${channel.name} is now locked.`})
    } catch (e) {
      message.channel.send({ content: 'An error has occured.'})
    }
    } else {
              message.channel.send({ content: "You dont have the permission, to use this command!" })
  }
}
}