const { EmbedBuilder, Message, Client } = require("discord.js");
const { readdirSync } = require("fs");
const client = require('../../index')
const config = require('../../config.json');

const prefix = client.prefix;
let color = "#ff0000"; // color of the main embed

const create_mh = require(`../../functions/menu.js`); // creates the drop down menu

module.exports = {
    name: "help",
    aliases: ['commands', 'h'],
    emoji: `??`, 
    description: "Shows all available bot commands",
    run: async (client, message, args, Discord, db) => {

        let categories = [];
        let cots = [];

        if (!args[0]) {

          // if you want your 'test' folder to not show when the help command is ran, use this
          let ignored = [
            'test'
          ]
            

             const emo = {
                info: "📰",
                moderation: "⛔",
                levels: "🆙",
                giveaway: "🎉",
               }

            let ccate = []
          
            readdirSync('./commands/').forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                if (ignored.includes(dir.toLowerCase())) return;

                const name = `${emo[dir]} - ${dir}`
                
                let nome = dir.toUpperCase()

                let cats = new Object()
                
                cats = {
                    name: name,
                    value: `\`${prefix}help ${dir.toLowerCase()}\``,
                    inline: true
                }


                categories.push(cats)
                ccate.push(nome)
            });
            //embed
            const embed = new EmbedBuilder()
                .setTitle(`Bot Commands`)
                .setDescription(`>>> Mein prefix ist \`${prefix}\`\nNutze das Menü, oder nutze \`${prefix}help [Kategorie]\` um meine Commands zu sehen!`)
                .addFields(categories)
                .setThumbnail(message.guild.iconURL({dynamic: true}))
                /*.setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )*/
                .setTimestamp()
                .setColor(color)


//creating the dropdown menu
            let menus = create_mh(ccate)
            return message.reply({
                embeds: [embed],
                components: menus.smenu
            }).then((msgg) => {

                const menuID = menus.sid;

                const select = async (interaction) => {
                    if (interaction.customId != menuID) return;

                    let {
                        values
                    } = interaction;

                    let value = values[0]

                    let catts = []

                    readdirSync("./commands/").forEach((dir) => {
                        if (dir.toLowerCase() !== value.toLowerCase()) return;
                        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                            file.endsWith(".js")
                        )


                        const cmds = commands.map((command) => {
                            let file = require(`../../commands/${dir}/${command}`)

                            if (!file.name) return "There is no such command.";

                            let name = file.name.replace(".js", "")

                            if (client.commands.get(name).hidden) return;


                            let des = client.commands.get(name).description;
                            let emo = client.commands.get(name).emoji;
                            let emoe = emo ? `${emo} - ` : ``;

                            let obj = {
                                cname: `${emoe}\`${name}\``,
                                des
                            }

                            return obj
                        })

                        let dota = new Object();

                        cmds.map(co => {
                            if (co == undefined) return;

                            dota = {
                                name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                                value: co.des ? co.des : `No description given.`,
                                inline: true,
                            }
                            catts.push(dota)
                        })

                        cots.push(dir.toLowerCase())
                    })

                    if (cots.includes(value.toLowerCase())) {
                        const combed = new EmbedBuilder()
                            .setTitle(`__${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`)
                            .setDescription(`Nutze \`${prefix}help\` gefolgt von einem Command Namen um mehr Informationen über den Befehl zu erhalten \nZum Beispiel: \`${prefix}help ping\`.\n\n`)
                            .addFields(catts)
                            .setColor(color)

                        await interaction.deferUpdate();

                        return interaction.message.edit({
                            embeds: [combed],
                            components: menus.smenu
                        })
                    }

                }

                const filter = (interaction) => {
                    return !interaction.user.bot && interaction.user.id == message.author.id
                }

                const collector = msgg.createMessageComponentCollector({
                    filter,
                    componentType: "SELECT_MENU"
                })
                collector.on("collect", select)
                collector.on("end", () => null)

            })

        } else {
            let catts = []

            readdirSync("./commands/").forEach((dir) => {
                if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                )


                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`)

                    if (!file.name) return "No command name."

                    let name = file.name.replace(".js", "")

                    if (client.commands.get(name).hidden) return


                    let des = client.commands.get(name).description
                    let emo = client.commands.get(name).emoji
                    let emoe = emo ? `${emo} - ` : ``;

                    let obj = {
                        cname: `${emoe}\`${name}\``,
                        des
                    }

                    return obj
                })

                let dota = new Object();

                cmds.map(co => {
                    if (co == undefined) return;

                    dota = {
                        name: `${cmds.length === 0 ? "In progress." : prefix + co.cname}`,
                        value: co.des ? co.des : `No Description`,
                        inline: true,
                    }
                    catts.push(dota)
                })

                cots.push(dir.toLowerCase());
            })

            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                )

            if (cots.includes(args[0].toLowerCase())) {
                const combed = new EmbedBuilder()
                    .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
                    .setDescription(`Nutze \`${prefix}help\` gefolgt von einem Command Namen um mehr Informationen aber den Befehl zu erhalten\nZum Beispiel: \`${prefix}help ping\`.\n\n`)
                    .addFields(catts)
                    .setColor(color)

                return message.reply({
                    embeds: [combed]
                })
            }

            if (!command) {
                const embed = new EmbedBuilder()
                    .setTitle(`Ungültiger command! Nutze \`${prefix}help\` für alle meine commands!`)
                    .setColor("RED");
                return await message.reply({
                    embeds: [embed],
                    allowedMentions: {
                        repliedUser: false
                    },
                })
            }

            const embed = new EmbedBuilder() 
                .setTitle("Command Details:")
                .addField(
                    "Command:",
                    command.name ? `\`${command.name}\`` : "No name for this command."
                )
                .addField(
                    "Aliases:",
                    command.aliases ?
                    `\`${command.aliases.join("` `")}\`` :
                    "No aliases for this command."
                )
                .addField(
                    "Command Description:",
                    command.description ?
                    command.description :
                    "No description for this command."
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color);
            return await message.reply({
                embeds: [embed]
            })
        }
    },
}