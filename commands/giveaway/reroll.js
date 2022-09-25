const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    name : 'reroll',
    run : async(client, message, args) => {
        if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send('You do not have permission')

        if(!args[0]) return message.channel.send('Bitte Gebe eine MessageID an!')

        const giveaway = client.giveaways.giveaways.find((g) => g.messageID === args[0]);
        if(!giveaway) return message.channel.send('Ich konnte das giveaway nicht finden!.')

        client.giveaways.reroll(giveaway.messageID)
            .then(() => {
                message.channel.send("Giveaway rerolled");
            })
            .catch(err => {
                console.log(err)
            })
    }
}