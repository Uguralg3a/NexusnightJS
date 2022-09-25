const { Client, Message, EmbedBuilder}  =require('discord.js')

module.exports = {
    name: "bugreport",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const teamchat = client.channels.cache.get('1014171418063290419')

        const query = args.join(" ");
        if(!query) return message.reply("Gib bitte eine Meldung an!")

        const reportEmbed = new EmbedBuilder()
        .setTitle("Neuer Bug")
        .addFields(
            {name: "Author: ", value: message.author.toString()},
            {name: "Guild: ", value: message.guild.name},
            {name: "Report: ", value: query}
        )
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp();

        teamchat.send({embeds: [reportEmbed]})
    }
}