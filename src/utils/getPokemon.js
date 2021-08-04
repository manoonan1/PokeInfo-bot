const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
//const { getShinyEmbed } = require('./shinyHelpers');
const  POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon';

//=======================$general helper functions====================//
async function getPokemonData(message) {
    const pokemon = message.content.split(" ")[1];
    const pokemonData = await getPokemon(pokemon);
    return pokemonData;
}

async function getPokemon(pokemon){
    let response = await fetch(`${POKEMON_URL}/${pokemon}`);
    return await response.json();
}

//=======================EXPORTS====================//
module.exports= { getPokemonData };


