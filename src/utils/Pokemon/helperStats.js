require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getPokemonJSON } = require('./getPokemon');

//=======================$stats helper functions====================//
async function getStatsEmbed(message) {
    const embed = new MessageEmbed();
    const pokeData = await getPokemonJSON(message);
    const { sprites, stats, name, id } = pokeData;
    embed.setTitle(`${name} #${id}`);
    embed.setThumbnail(`${sprites.front_default}`);
    stats.forEach(stat => embed.addField(stat.stat.name, stat.base_stat));
    return embed;
}

//=======================EXPORTS====================//
module.exports = { getStatsEmbed };