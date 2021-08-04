require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getPokemonInfo } = require('./getPokemon');

//index comes from bots.js commandIndex. For $stats this value should be = 2
//=======================$stats helper functions====================//
async function getStatsEmbed(message, index) {
    const embed = new MessageEmbed();
    const pokemonDataArray = await getPokemonInfo(message, index);
    const sprite = pokemonDataArray[0];
    const name = pokemonDataArray[1];
    const id = pokemonDataArray[2];
    const stats = pokemonDataArray[3];
    embed.setTitle(`${name} #${id}`);
    embed.setThumbnail(`${sprite}`);
    stats.forEach(stat => embed.addField(stat.stat.name, stat.base_stat));
    return embed;
}

module.exports= { getStatsEmbed };