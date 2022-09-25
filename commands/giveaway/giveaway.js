const ms = require('ms')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const client = require('../../index')
const {config} = require('../../config.json');
const {hostedBy, everyoneMention} = require('../../config.json');

const prefix = client.prefix;

module.exports = {
    name : 'giveaway',
    run : async(client, message, args) => {
        if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send('You dont have manage messages permission.')
        
        const channel = message.mentions.channels.first()
        if(!channel) return message.channel.send('Please specify a channel')

        const dauer = args[1]
        if(!dauer) return message.channel.send('please enter a valid duration')

        const winners = args[2]
        if(!winners) return message.channel.send('Please specify an amount of winners')
    

        const prize = args.slice(3).join(" ")
        if(!prize) return message.channel.send('Please sepcify a prize to win')

        client.giveaways.start(channel, {
            duration : ms(dauer),
            prize : prize,
            winnerCount: parseInt(winners),
            hostedBy: hostedBy ? message.author : null,
            messages: {
                giveaway: (everyoneMention ? "@everyone\n\n" : '') + "Giveaway",
                giveawayEnd: (everyoneMention ? "@everyone\n\n" : '') + "Giveaway Vorbei",
                timeRemaining: "Zeit verbliebend **{duration}**",
                inviteToParticipate: "Reagiere mit 🎉 um dem Giveaway beizutreten.",
                winMessage: "Herzlichen Glückwunsch {winners}, du hast das Giveaway gewinnen!",
                embedFooter: "Giveaway Zeit!",
                noWinner: "Ich konnte keinen Gewinner Finden",
                hostedBy: `Erstellt von ${message.author}`,
                winners: "Gewinner",
                endedAt: 'Endet in',
                units: {
                    seconds: "Sekunden",
                    minutes: "Minuten",
                    hours: 'Stunden',
                    days: 'Tagen',
                    pluralS: false
                }
            },
           
        })
        message.channel.send(`Giveaway startet in ${channel}`)
    }
}