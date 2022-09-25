const {Client, Message, EmbedBuilder} = require('discord.js')
const Schema = require('../../models/birthday')
module.exports = {
    name: "checkbday",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        Schema.findOne({ User: user.id}, async ( err, data) => {
            if(!data) return message.reply("Dieses Mitglied hat noch kein Geburtstag festgelegt!")
            message.channel.send(`${user} hat am ${data.Birthday} geburtstag!`)
        })
    }
}