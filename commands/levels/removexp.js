const Levels = require('discord-xp')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: 'removexp',
  description: 'Remove xp from the mentioned member',
  UserPerms: ['ADMINISTRATOR'],
  run: async (client, message, args) => {
    const selfMember = message.member;
    const member = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0])
    if (!member) return message.reply({ content: 'Please specify the member you are removing XP from'})

    const xp = args.slice(1).join(' ')
    if (!xp || !Number(xp)) return message.reply({ content: 'XP must be a number'})

    if(selfMember.permissions.has(PermissionsBitField.Flags.Administrator)) {
      
    await Levels.subtractXp(member.id, message.guild.id, xp)
    const user = await Levels.fetch(member.id, message.guild.id)
    const xPR = await Levels.xpFor(user.level + 1)
    console.log(xp)
    message.channel.send({ content: `Removed ${xp} from ${member.user.tag}`}) 
  }
}
}