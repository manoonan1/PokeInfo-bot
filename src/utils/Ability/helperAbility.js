require ('dotenv').config();
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { getPokemonData } = require('../Pokemon/getPokemon');
const { getAbility, getAbilityData } = require('./getAbility');

//index comes from bots.js commandIndex. For $ability this value should be = 3
//=======================$ability helper functions====================//
async function getAbilityEmbed(message) {
    const embed = new MessageEmbed();
    const abData = await getAbilityData(message);
    const { effect_entries, name, } = abData;
    var index = effect_entries.findIndex(ind => ind.language.name === 'en');
    const effect = effect_entries[index].effect;
    embed.setTitle(`${name}`);
    embed.addField('Effect', effect);
    return embed;
}

async function getAbilityText(ability) {
    const abData = await getAbility(ability);
    const { effect_entries } = abData;
    var index = effect_entries.findIndex(ind => ind.language.name === 'en');
    const effect = effect_entries[index].effect; //effect_entries[index] needs be used to grab appropriate language
    return effect 
}

async function getAbilityArray(abilities){
    let abilityArray = [];
    for (let i = 0; i<abilities.length; i++){
        abilityArray.push(await getAbilityText(abilities[i].ability.name))   
    }
    return abilityArray;
}

module.exports= { getAbilityEmbed, getAbilityText, getAbilityArray };