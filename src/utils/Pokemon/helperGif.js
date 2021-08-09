require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getPokemonJSON } = require('./GetPokemon');

//=======================$gifmon helper functions====================//
async function getGifEmbed(message) {
    const embed = new MessageEmbed();
    const gifUrl = await getGifURL(message);
    embed.setImage(gifUrl);
    return embed;
}

async function getGifURL(message) {
    const pokeData = await getPokemonJSON(message);
    const { name } = pokeData;
    const pokemonName = `${name}`;
    return "https://projectpokemon.org/images/normal-sprite/" + pokemonName + ".gif";
}

//=======================EXPORTS====================//
module.exports = { getGifEmbed };