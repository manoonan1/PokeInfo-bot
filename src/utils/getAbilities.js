const fetch = require('node-fetch');
const  BASE_URL = 'https://pokeapi.co/api/v2/ability';

async function getAbility(ability){
    let response = await fetch(`${BASE_URL}/${ability}`);
    return await response.json();
}

module.exports= { getAbility };