const Levels = require("discord-xp")
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'leaderboard',
  aliases: ['lb', 'levels'],
  description: 'Check the leaderboard of the server',
  run: async (client, message, args) => {
    const rawLeader = await Levels.fetchLeaderboard(message.guild.id, 10) // the amount of people you want to be shown on the leaderboard

    // if (rawLeader.length > 1) return message.reply({ content: 'There is no one on the leaderboard!'})

    const leaderboard = await Levels.computeLeaderboard( client, rawLeader, true) // processing the leaderboard with discord-xp

    const lb = leaderboard.map( (e) => 
    `\`${e.position}\`. **${e.username}#${e.discriminator}** - Level: **${e.level}** - XP: **${e.xp.toLocaleString()}**`)

    const embed = new EmbedBuilder()
    .setTitle(`**${message.guild.name}'s Leaderboard**`)
    .setDescription(`${lb.join('\n\n')}`)
    .setColor('ff0000')

    message.channel.send({ embeds: [embed] })
  }
}