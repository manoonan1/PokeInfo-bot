const { MessageEmbed } = require('discord.js');
const { getShinyEmbed } = require('./Pokemon/CreateShinyEmbed');
const { getGifEmbed } = require('./Pokemon/CreateGifmonEmbed');
const { getStatsEmbed } = require('./Pokemon/CreateStatsEmbed');
const { getAbilityEmbed } = require('./Ability/CreateAbilityEmbed')
const { getAbmonEmbed } = require('./Ability/CreateAbmonEmbed');
const { getTypeEmbed } = require('./Type/CreateTypeEmbed');
const { getVersusEmbed } = require('./Type/CreateVsEmbed');


async function getEmbed(command, content) {
    let embed = new MessageEmbed();
    switch(command) {
        case '$shiny': //Example command: $shiny bulbasaur
            embed = await getShinyEmbed(content);
            break;
        case '$gifmon': //Example command: $gifmon bulbasaur
            embed = await getGifEmbed(content);
            break;
        case '$stats': //Example command: $stats bulbasaur
            embed = await getStatsEmbed(content);
            break;
        case '$ability': //Example command: $ability effect-spore
            embed = await getAbilityEmbed(content);
            break;
        case '$abmon': //Example command: $abmon bulbasaur
            embed = await getAbmonEmbed(content);
            break;
        case '$type': //Example command: $type grass
            embed = await getTypeEmbed(content);
            break;
        case '$vs': //Example command $type grass vs charizard
            embed = await getVersusEmbed(content);
            break;
    }
    return embed;
}

//=======================EXPORTS====================//
module.exports = { getEmbed };