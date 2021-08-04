require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getPokemonData } = require('./getPokemon');

//index comes from bots.js commandIndex. For $stats this value should be = 2
//=======================$stats helper functions====================//
async function getStatsEmbed(message) {
    const embed = new MessageEmbed();
    const pokeData = await getPokemonData(message);
    const { sprites, stats, name, id } = pokeData;
    embed.setTitle(`${name} #${id}`);
    embed.setThumbnail(`${sprites.front_default}`);
    stats.forEach(stat => embed.addField(stat.stat.name, stat.base_stat));
    return embed;
}

module.exports= { getStatsEmbed };