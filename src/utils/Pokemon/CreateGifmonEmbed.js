require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getPokemonJSON } = require('./GetPokemon');

//=======================$gifmon helper functions====================//
async function getGifEmbed(pokemon) {
    const embed = new MessageEmbed();
    const gifUrl = await getGifURL(pokemon);
    embed.setImage(gifUrl);
    return embed;
}

async function getGifURL(pokemon) {
    const pokeData = await getPokemonJSON(pokemon);
    const { name } = pokeData;
    const pokemonName = `${name}`;
    return "https://projectpokemon.org/images/normal-sprite/" + pokemonName + ".gif";
}

//=======================EXPORTS====================//
module.exports = { getGifEmbed };