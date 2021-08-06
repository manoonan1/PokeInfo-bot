const fetch = require('node-fetch');
const  ABILITY_URL = 'https://pokeapi.co/api/v2/ability';


//=======================$ability helper functions====================//


async function getAbilityArray(abilities){ 
    let abilityArray = [];
    for (let i = 0; i<abilities.length; i++){
        abilityArray.push(await getAbilityText(abilities[i].ability.name))   
    }
    return abilityArray;
}
async function getAbilityArrayTest(abilities){ 
    let abilityArray = [];
    for (let i = 0; i<abilities.length; i++){
        let abilityInfo = await getAbilityInfo(abilities[i].ability.name);
        abilityArray.push(abilityInfo);   
    }
    return abilityArray;
}

async function getAbilityText(ability) {
    const abData = await getAbility(ability);
    const { effect_entries } = abData;
    var index = effect_entries.findIndex(ind => ind.language.name === 'en');
    const effect = effect_entries[index].effect; //effect_entries[index] needs be used to grab appropriate language
    return effect 
}

async function getAbilityInfo(ability) { //returns an array with abilityName at index 0 and abilityEffect at index 1
    const abData = await getAbilityData(ability);
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
module.exports= { getAbilityData, getAbility, getAbilityArray, getAbilityInfo };