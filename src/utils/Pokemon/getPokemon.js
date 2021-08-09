const fetch = require('node-fetch');
var fs = require('fs');
const  POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon';

//=======================$general helper functions====================//
async function getPokemonJSON(message) {
    let pokemon = message.content.split(" ")[1];
    const response = await fetch(`${POKEMON_URL}/${pokemon}`);
    let pokemonData = response.json();
    return pokemonData;
}

function isVariant(pokemon){
    var variantJSON = readJSON("src/utils/Pokemon/pokemonVariants.json");
    for (let i = 0; i < variantJSON.pokemon.length; i++){
        if(variantJSON.pokemon[i].name == pokemon){
            return true;
        }
    }
    return false;
}

function readJSON(path){
    var data = fs.readFileSync(path ,"utf8");
    return JSON.parse(data);   
}

//=======================EXPORTS====================//
module.exports = { getPokemonJSON, isVariant, readJSON };