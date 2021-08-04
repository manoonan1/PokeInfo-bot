const fetch = require('node-fetch');
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
    //Data we need for $eeeeeee
}

async function getPokemon(pokemon){
    let response = await fetch(`${POKEMON_URL}/${pokemon}`);
    return await response.json();
}


//=======================EXPORTS====================//
module.exports= { shinyURL, gifURL };