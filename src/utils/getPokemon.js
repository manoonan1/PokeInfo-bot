const fetch = require('node-fetch');
const { Client, MessageEmbed } = require('discord.js');
const  POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon';

let commandIndex = 0; //index indicates which command we're using
                //0: $shiny
                //1: $gifmon


//=======================$shiny and $gifmon helper functions====================//
async function shinyURL(message) {
    commandIndex = 0; //set commandIndex to 0 for the $shiny command
    const pokemonID = await getPokemonInfo(message, commandIndex);
    const strId = String(pokemonID).padStart(4, '0');
    return "https://files.pokefans.net/sprites/home/" + strId + "-000-shiny.png";
}

async function gifURL(message) {
    commandIndex = 1; //set commandIndex to 1 for the $gifmon command
    const pokemonName = await getPokemonInfo(message, commandIndex);
    return "https://projectpokemon.org/images/normal-sprite/" + pokemonName + ".gif";
}

async function statsEmbed(message) {
    commandIndex = 2; //set commandIndex to 1 for the $gifmon command
    const embed = await getPokemonInfo(message, commandIndex);
    return embed;
}

async function getPokemonInfo(message, index) {
    const pokemon = message.content.split(" ")[1];
    const pokeData = await getPokemon(pokemon);
    //Data we need for $shiny
    if(index == 0) { 
        const { id } = pokeData;
        const pokemonID = `${id}`;
        return pokemonID;
    };
    //Data we need for $gifmon
    if(index == 1) {
        const { name } = pokeData;
        const pokemonName = `${name}`;
        return pokemonName;
    }
    //Data we need for $stats
    if(index == 2) {
        const { sprites, stats, name, id } = pokeData;
        const embed = new MessageEmbed();
        embed.setTitle(`${name} #${id}`);
        embed.setThumbnail(`${sprites.front_default}`);
        stats.forEach(stat => embed.addField(stat.stat.name, stat.base_stat));
        return embed;
    }
}

async function getPokemon(pokemon){
    let response = await fetch(`${POKEMON_URL}/${pokemon}`);
    return await response.json();
}


//=======================EXPORTS====================//
module.exports= { shinyURL, gifURL, statsEmbed };