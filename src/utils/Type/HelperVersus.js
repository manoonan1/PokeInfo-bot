require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getTypeJSON } = require('./GetType');
const { getPokemonJSON } = require('../Pokemon/GetPokemon');
const { getDamageArray } = require('./GetType');

async function getVersusEmbed(message) {
    const embed = new MessageEmbed();
    //move type data
    const typeName = message.content.split(" ")[1];
    const typeMessage = { 'content': '$type ' + typeName}; //configure message so we can get the right type json
    const typeData = await getTypeJSON(typeMessage);
    const { damage_relations } = typeData;
    //pokemon type data
    const pokemonName = message.content.split(" ")[2];
    const pokemonMessage = { 'content': "$stats " + pokemonName};//configure message so we can get the right pokemon json
    const pokemonData = await getPokemonJSON(pokemonMessage);
    const { types } = pokemonData;
    //effectiveness comparison
    const damageCalc = calculateMultiplier(damage_relations, types);
    const effectiveness = effectivenessCalculator(damageCalc);
    //create embed
    const upperType = typeName.charAt(0).toUpperCase() + typeName.slice(1);
    const upperPokemon = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    embed.setTitle(upperType +' moves vs ' + upperPokemon);
    embed.addField('Damage Multiplier: ' + damageCalc, upperType + ' moves are ' + effectiveness + ' against ' + upperPokemon); 
    return embed;
}

function calculateMultiplier(damage_relations, pokemonTypes) {
    const double = damage_relations.double_damage_to;
    const half = damage_relations.half_damage_to;
    const notEffective = damage_relations.no_damage_to;
    const doubleDamageArray = getDamageArray(double);
    const halfDamageArray = getDamageArray(half);
    const noDamageArray = getDamageArray(notEffective);
    let damageCalc = 1;
    for(i = 0; i < pokemonTypes.length; i++) {
        if (doubleDamageArray.includes(pokemonTypes[i].type.name)) {
            damageCalc *= 2;
        }
        if (halfDamageArray.includes(pokemonTypes[i].type.name)) {
            damageCalc *= .5;
        }
        if (noDamageArray.includes(pokemonTypes[i].type.name)) {
            damageCalc *= 0;
        }
    }
    return damageCalc;
}

function effectivenessCalculator(damageCalc) {
    var effectiveness;
    if (damageCalc == 0) effectiveness = 'no effect';
    if (damageCalc == .25 || damageCalc == .5) effectiveness = 'not very effective';
    if (damageCalc == 1) effectiveness = 'effective';
    if (damageCalc == 2 || damageCalc == 4) effectiveness = 'super effective';
    return effectiveness;
}

//=======================EXPORTS====================//
module.exports = { getVersusEmbed };
