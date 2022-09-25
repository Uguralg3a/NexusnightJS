const got = require('got')
const { MessageEmbed, EmbedBuilder } = require('discord.js')
module.exports = {
    name : 'meme',
    run : async(client, message) => {
        got('https://www.reddit.com/r/memes/random/.json').then(res => {
            let content = JSON.parse(res.body)
            const embed =                 new EmbedBuilder()
            .setTitle(content[0].data.children[0].data.title)
            .setImage(content[0].data.children[0].data.url)
            .setDescription(`👍 ${content[0].data.children[0].data.ups} 👎 ${content[0].data.children[0].data.downs} | Comments : ${content[0].data.children[0].data.num_comments}`)
                
            message.channel.send({embeds: [embed]})
        })
    }
}