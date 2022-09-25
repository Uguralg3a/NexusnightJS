const { ApplicationCommandType } = require('discord.js');

module.exports = {
	name: 'test',
	description: "test.",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            "name": "test",
            "description": "test",
            "type": 3,
            "required": true,
        }
    ],

    /**
     * 
     * @param {Client} client 
     * @param {interaction} interaction 
     */
	run: async (client, interaction) => {
        const test = interaction.options.getString('test');
		interaction.reply({ content: `${test}` }) 
	}
};