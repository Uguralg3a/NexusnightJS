const translate = require('@iamtraction/google-translate')
const { EmbedBuilder } = require('discord.js')
const client = require('../../index')

module.exports= {
    name : 'translate',
    run : async(client, message, args) => {
        try {
            const query = args.slice(1).join(' ')
            if(!query) return message.reply({ content: 'Bitte gebe an, was du übersetzen willst.'})

            const arg = args[0]

            const translated = await translate(query, { to: `${arg}`})
            const embed = new EmbedBuilder()
            .setTitle("Übersetzt!")
            .addFields(
                {name: "Text: ", value: query},
                {name: "Ausgewählte Sprache: ", value: arg},
                {name: 'Übersetzung: ', value: translated.text}
                )
            .setTimestamp()
            
            
            message.channel.send({embeds: [embed]})
        } catch(error) {
            return message.channel.send({ content: "error"}).then(() => console.log(error))
        }
    }
}