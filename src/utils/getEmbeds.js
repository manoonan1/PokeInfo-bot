const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { getShinyEmbed } = require('./Pokemon/helperShiny');
const { getGifEmbed } = require('./Pokemon/helperGif');
const { getStatsEmbed } = require('./Pokemon/helperStats');
const { getAbilityEmbed } = require('./Ability/helperAbility')
const { getAbmonEmbed } = require('./Ability/helperAbmon')

async function getEmbed(message, index) {
    let embed = new MessageEmbed();
    if (index == 0) {
        embed = await getShinyEmbed(message);
    }
    if (index == 1) {
        embed = await getGifEmbed(message);
    }
    if (index==2) {
        embed = await getStatsEmbed(message);
    }
    if (index==3) {
        embed = await getAbilityEmbed(message);
    }
    if (index==4) {
        embed = await getAbmonEmbed(message);
    }

    return embed;
}

//=======================EXPORTS====================//
module.exports= { getEmbed };