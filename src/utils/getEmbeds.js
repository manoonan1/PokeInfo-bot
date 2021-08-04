const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { getShinyEmbed } = require('./shinyHelpers');
const { getGifEmbed } = require('./gifHelpers');
const { getStatsEmbed } = require('./statHelpers');

async function getEmbed(message, index) {
    let embed = new MessageEmbed();
    if (index == 0) {
        embed = await getShinyEmbed(message, index);
    }
    if (index == 1) {
        embed = await getGifEmbed(message, index);
    }
    if (index==2) {
        embed = await getStatsEmbed(message, index);
    }
    return embed;
}

//=======================EXPORTS====================//
module.exports= { getEmbed };