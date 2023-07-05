const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('id')
        .setDescription('Return Item Id')
        .addStringOption((option) =>
            option
                .setName('itemname')
                .setDescription('Input the item name!')
                .setRequired(true)
        ),

    async execute(interaction, client) {
        const userInput = interaction.options.getString('itemname');
        const allowedRoles = ['123xx'] // #azuka roles id yang bisa pakai (ambil dari role settings)
        let getInfoItem = async () => {
            var items = JSON.parse(fs.readFileSync('./data.json')).items;
            var data = items.find(itm =>
                itm.name.toLowerCase() === userInput.toLowerCase()
            )
            console.log(data)
            return data
        }

        if (interaction.member.roles.cache.find(r => allowedRoles.includes(r.id))) {
            let item = await getInfoItem()

            const newMessage = `Name: **${item.name}**\n Id: **${item.itemID}**`;
            await interaction.reply({ content: newMessage });
        } else {
            const newMessage = `Only role Script-Buyer is able to use this bot!`;
            await interaction.reply({ content: newMessage });
        }


    }

}