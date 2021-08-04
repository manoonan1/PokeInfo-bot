const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
//const { getShinyEmbed } = require('./shinyHelpers');
const  POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon';

//=======================$general helper functions====================//
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
        const pokemonDataArray = [sprites.front_default, name, id, stats];
        return pokemonDataArray;
    }
}

async function getPokemon(pokemon){
    let response = await fetch(`${POKEMON_URL}/${pokemon}`);
    return await response.json();
}

//=======================EXPORTS====================//
module.exports= { getPokemonInfo };


