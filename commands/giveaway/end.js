const ms = require('ms')
const { PermissionsBitField } = require('discord.js')

module.exports = {
    name : 'end',
    run : async(client, message, args) => {
        if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send('You do not have permissions to use this command')
        if(!args[0]) return message.channel.send('Bitte Gebe eine MessageID an!')

        const giveaway = client.giveaways.giveaways.find((g) => g.messageID === args.join(" "))
        if(!giveaway) return message.channel.send('Giveaway konnte nicht gefunden werden')

        client.giveaways.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        }).then(()  => {
            message.channel.send(`Giveaway wird in weniger als ${client.giveaway.options.updateCountdownEvery / 1000} Sekunden enden!`)
        }).catch(err => {
            console.log(err)
            message.channel.send('An error occured')
        })
        
    }
}