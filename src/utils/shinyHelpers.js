require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getPokemonData } = require('./getPokemon');

//index comes from bots.js commandIndex. For $shiny this value should be = 0
//=======================$shiny helper functions====================//
async function getShinyEmbed(message, index) {
    const normalUrl = await getImageURLs(message, 0, index);
    const shinyUrl = await getImageURLs(message, 1, index);
    const embed = new MessageEmbed();
    embed.setThumbnail(normalUrl);
    embed.setImage(shinyUrl);
    return embed;
}

async function getImageURLs(message, shinyFlag) {
    const pokeData = await getPokemonData(message);
    const { id } = pokeData;
    let strId = `${id}`;
    strId = String(strId).padStart(4, '0');
    if (shinyFlag==0) {
        return "https://files.pokefans.net/sprites/home/" + strId + "-000.png";
    }
    if (shinyFlag==1) {
        return "https://files.pokefans.net/sprites/home/" + strId + "-000-shiny.png";
    }
}

//=======================EXPORTS====================//
module.exports= { getShinyEmbed };