const { MessageEmbed } = require('discord.js');
const { getShinyEmbed } = require('./Pokemon/HelperShiny');
const { getGifEmbed } = require('./Pokemon/HelperGif');
const { getStatsEmbed } = require('./Pokemon/HelperStats');
const { getAbilityEmbed } = require('./Ability/HelperAbility')
const { getAbmonEmbed } = require('./Ability/HelperAbmon');
const { getTypeEmbed } = require('./Type/HelperType');
const { getVersusEmbed } = require('./Type/HelperVersus');


async function getEmbed(message, index) {
    let embed = new MessageEmbed();
    if (index == 0) {
        embed = await getShinyEmbed(message);
    }
    if (index == 1) {
        embed = await getGifEmbed(message);
    }
    if (index == 2) {
        embed = await getStatsEmbed(message);
    }
    if (index == 3) {
        embed = await getAbilityEmbed(message);
    }
    if (index == 4) {
        embed = await getAbmonEmbed(message);
    }
    if (index == 5) {
        embed = await getTypeEmbed(message);
    }
    if (index == 6) {
        embed = await getVersusEmbed(message);
    }
    return embed;
}

//=======================EXPORTS====================//
module.exports = { getEmbed };