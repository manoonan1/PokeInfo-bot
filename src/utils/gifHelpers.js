require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getPokemonInfo } = require('./getPokemon');

//index comes from bots.js commandIndex. For $gifmon this value should be = 1
//=======================$gifmon helper functions====================//
async function getGifEmbed(message, index) {
    const embed = new MessageEmbed();
    const gifUrl = await getGifURL(message, index);
    embed.setImage(gifUrl);
    return embed;
}

async function getGifURL(message, index) {
    const pokemonName = await getPokemonInfo(message, index);
    return "https://projectpokemon.org/images/normal-sprite/" + pokemonName + ".gif";
}

module.exports= { getGifEmbed };