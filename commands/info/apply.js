/*const { Client, Message, EmbedBuilder}  =require('discord.js')

module.exports = {
    name: "apply",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     
    run: async(client, message, args) => {
        
        const questions = [
            "Wie heißt du?",
            "Wie heißt du auf Discord? (Beispiel: ΛПGΣᄂ#0570)",
            "Wie heißt du in Minecraft? (Beispiel: Uguralg3a)",
            "Als was möchtest du dich Bewerben?",
            "Was sind deine Stärken?",
            "Was sind deine Schwächen?",
            "Falls du Developer oder Builder werden möchtest, sende bitte ein paar deiner Projekte rein. (Developer bitte über GitHub, Builder bitte über Bilder Paste Seiten)",
            "Sonst noch was?"   
        ];

        let collectCounter = 0;
        let endCounter = 0;

        const filter = (m) => m.author.id == message.author.id;

        const appStart = await message.author.send(questions[collectCounter++])
        const channel = appStart.channel;

        const collector = channel.createMessageCollector({filter});

        collector.on("collect", () => {
            if(collectCounter < questions.length) {
                channel.send(questions[collectCounter++])
            } else {
                channel.send("Deine Bewerbung wurde abgeschickt!")
                collector.stop("fullfilled")
            }
        })

        const appChannel = client.channels.cache.get("1014171418063290419")
        collector.on('end', (collected, reason) => {
            if (reason == 'fullfilled') {
                let index = 1;
                const mappedResponses = collected.map((msg) => {
                    return `${index++}) ${questions[endCounter++]}\n-> ${msg.content}`
                })
                .join("\n\n")

                const embed = new EmbedBuilder()
               // .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                .setTitle("Neue Bewerbung von " + message.author.tag)
                .setDescription(mappedResponses)
                .setTimestamp()

                appChannel.send({embeds: [embed]})
            }
        })
    }
}*/