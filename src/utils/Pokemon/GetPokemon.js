const fetch = require('node-fetch');
const Fuse = require('fuse.js');
var fs = require('fs');
const  POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon';

//=======================$general helper functions====================//
async function getPokemonJSON(pokemon) {
    correctPokemon = await correctPokemonInput(pokemon)
    console.log(correctPokemon[0]);
    response = await fetch(`${POKEMON_URL}/${correctPokemon[0]}`);
    const pokemonData = response.json();
    return pokemonData;
}

function isVariant(pokemon){
    var variantJSON = readJSON("src/utils/Pokemon/PokemonVariants.json");
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

async function correctPokemonInput(pokemon){
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118");
    const pokemonNameList = await response.json();
    const options = {
        includeScore: true,
        keys: ['name']
    }
    const fuse = new Fuse(pokemonNameList.results, options);
    const result = fuse.search(pokemon);
    let candidates = compileResultList(result);
    return candidates;
}

function compileResultList(result){
    let count = 0;
    let pokemonResultList = [result[count].item.name];
    while(result[count].score == result[count+1].score){
        pokemonResultList.push(result[count+1].item.name);
        count++;
    }
    return pokemonResultList;
}
//=======================EXPORTS====================//
module.exports = { getPokemonJSON, isVariant, readJSON };