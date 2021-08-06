const fetch = require('node-fetch');
const  ABILITY_URL = 'https://pokeapi.co/api/v2/ability';

//=======================$ability helper functions====================//
async function getAbilityArray(abilities){ 
    let abilityArray = [];
    for (let i = 0; i<abilities.length; i++){
        let message = { 'content': "$ability " + abilities[i].ability.name};
        abilityArray.push(await getAbilityInfo(message));
    }
    return abilityArray;
}

async function getAbilityInfo(message) { //returns an array with abilityName at index 0 and abilityEffect at index 1
    const abData = await getAbilityData(message);
    const { effect_entries, name } = abData;
    var index = effect_entries.findIndex(ind => ind.language.name === 'en');
    const effect = effect_entries[index].effect; //effect_entries[index] needs be used to grab appropriate language
    const abilityInfo = [`${name}`, effect];
    return abilityInfo;
}

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
module.exports = { getAbilityArray, getAbilityInfo };