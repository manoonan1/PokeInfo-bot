require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getPokemonJSON } = require('./GetPokemon');

//=======================$stats helper functions====================//
async function getStatsEmbed(pokemon) {
    const embed = new MessageEmbed();
    const pokeData = await getPokemonJSON(pokemon);
    const { sprites, stats, name, id, types } = pokeData;
    embed.setTitle(`${name} #${id}`);
    embed.setThumbnail(`${sprites.front_default}`);
    let typeString = types[0].type.name;
    if (types.length == 2) {
        typeString += "/" + types[1].type.name;
    }
    embed.addField('type', typeString); 
    stats.forEach(stat => embed.addField(stat.stat.name, stat.base_stat));
    return embed;
}

//=======================EXPORTS====================//
module.exports = { getStatsEmbed };