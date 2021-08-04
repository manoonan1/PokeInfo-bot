const fetch = require('node-fetch');
const  ABILITY_URL = 'https://pokeapi.co/api/v2/ability';


//=======================$ability helper functions====================//
async function getAbilityData(message) {
    const ability = message.content.split(" ")[1];
    const abData = await getAbility(ability);
    return abData;
}

async function getAbility(ability){
    let response = await fetch(`${ABILITY_URL}/${ability}`);
    return await response.json();
}

//=======================EXPORTS====================//
module.exports= { getAbility, getAbilityData };