const fetch = require('node-fetch');
const  POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon';
const  ABILITY_URL = 'https://pokeapi.co/api/v2/ability';


let commandIndex = 0; //index indicates which command we're using
                //0: $shiny
                //1: $gifmon
//=======================$shiny and $gifmon helper functions====================//


async function photoURL(message) {
    commandIndex = 0;
    const pokemonID = await getPokemonInfo(message, commandIndex);
    const strId = String(pokemonID).padStart(4, '0');
    return "https://files.pokefans.net/sprites/home/" + strId + "-000-shiny.png";
}

async function gifURL(message) {
    commandIndex = 1;
    const pokemonName = await getPokemonInfo(message, commandIndex);
    return "https://projectpokemon.org/images/normal-sprite/" + pokemonName + ".gif";
}

async function getPokemonInfo(message, index) {
    const pokemon = message.content.split(" ")[1];
    const pokeData = await getPokemon(pokemon);
    const { id } = pokeData;
    const pokemonID = `${id}`;
    const { name } = pokeData;
    const pokemonName = `${name}`;
    if(index == 0) {
        return pokemonID;
    };
    if(index == 1) {
        return pokemonName;
    }
}

async function getPokemon(pokemon){
    let response = await fetch(`${POKEMON_URL}/${pokemon}`);
    return await response.json();
}
//=======================$ability helper functions====================//

async function getAbility(ability){
    let response = await fetch(`${ABILITY_URL}/${ability}`);
    return await response.json();
}

//=======================EXPORTS====================//
module.exports= {getAbility, photoURL, gifURL };