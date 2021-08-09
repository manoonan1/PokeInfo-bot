require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getPokemonJSON, isVariant, readJSON } = require('./getPokemon');


//=======================$shiny helper functions====================//
async function getShinyEmbed(message) {
    const normalUrl = await getImageURLs(message, 0);
    const shinyUrl = await getImageURLs(message, 1);
    const embed = new MessageEmbed();
    embed.setThumbnail(normalUrl);
    embed.setImage(shinyUrl);
    return embed;
}

async function getImageURLs(message, shinyFlag) {
    //variant boolean check
    if(isVariant(message.content.toLowerCase().split(" ")[1]) == true){
        variantData = readJSON("src/utils/Pokemon/pokemonVariants.json");
        index = variantData.pokemon.findIndex(ind => ind.name === message.content.toLowerCase().split(" ")[1]);
        if(shinyFlag == 0){
            return variantData.pokemon[index].image.replace("-shiny","");        
        }
        if(shinyFlag == 1){
            return variantData.pokemon[index].image;
        }
    }
    const pokeData = await getPokemonJSON(message);
    const { id } = pokeData;
    let strId = `${id}`;
    strId = String(strId).padStart(4, '0');
    if (shinyFlag == 0) {
        return "https://files.pokefans.net/sprites/home/" + strId + "-000.png";
    }
    if (shinyFlag == 1) {
        return "https://files.pokefans.net/sprites/home/" + strId + "-000-shiny.png";
    }
}

//=======================EXPORTS====================//
module.exports = { getShinyEmbed, isVariant };