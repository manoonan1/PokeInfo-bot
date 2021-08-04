require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getPokemonData } = require('./getPokemon');

//index comes from bots.js commandIndex. For $gifmon this value should be = 1
//=======================$gifmon helper functions====================//
async function getGifEmbed(message) {
    const embed = new MessageEmbed();
    const gifUrl = await getGifURL(message);
    embed.setImage(gifUrl);
    return embed;
}

async function getGifURL(message) {
    const pokeData = await getPokemonData(message);
    const { name } = pokeData;
    const pokemonName = `${name}`;
    return "https://projectpokemon.org/images/normal-sprite/" + pokemonName + ".gif";
}

module.exports= { getGifEmbed };