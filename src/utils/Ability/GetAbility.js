const fetch = require('node-fetch');
const  ABILITY_URL = 'https://pokeapi.co/api/v2/ability';

//=======================$ability helper functions====================//
async function getAbilityInfo(message) { //returns an array with abilityName at index 0 and abilityEffect at index 1
    const abData = await getAbilityJSON(message);
    const { effect_entries, name } = abData;
    var index = effect_entries.findIndex(ind => ind.language.name === 'en');
    var effect;
    try{
        effect = effect_entries[index].effect;
    }
    catch(TypeError){
        effect = abData.flavor_text_entries[0].flavor_text;
    }
     //effect_entries[index] needs be used to grab appropriate language
    const abilityInfo = [`${name}`, effect];
    return abilityInfo;
}

async function getAbilityJSON(message) {
    const ability = message.content.toLowerCase().split(" ")[1];
    let response = await fetch(`${ABILITY_URL}/${ability}`);
    const abData = response.json(); 
    return abData;
}

//=======================EXPORTS====================//
module.exports = { getAbilityInfo };
