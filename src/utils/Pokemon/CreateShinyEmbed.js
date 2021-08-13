require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getPokemonJSON, isVariant, readJSON } = require('./GetPokemon');



//=======================$shiny helper functions====================//
async function getShinyEmbed(pokemon) {
    const normalUrl = await getImageURLs(pokemon, 0);
    const shinyUrl = await getImageURLs(pokemon, 1);
    const embed = new MessageEmbed();
    embed.setThumbnail(normalUrl);
    embed.setImage(shinyUrl);
    return embed;
}

async function getImageURLs(pokemon, shinyFlag) {
    //variant boolean check
    if(isVariant(pokemon) == true){
        variantData = readJSON("src/utils/Pokemon/PokemonVariants.json");
        index = variantData.pokemon.findIndex(ind => ind.name === pokemon);
        if(shinyFlag == 0){
            return variantData.pokemon[index].image.replace("-shiny","");        
        }
        if(shinyFlag == 1){
            return variantData.pokemon[index].image;
        }
    }
    const pokeData = await getPokemonJSON(pokemon);
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
