require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getTypeJSON, getDamageArray } = require('./GetType');
const { getPokemonJSON } = require('../Pokemon/GetPokemon');

async function getVersusEmbed(input) { //Input is a string of "type pokemon"
    const embed = new MessageEmbed();
    //move type data
    const type = input.split(" ")[0];
    const typeData = await getTypeJSON(type);
    const { damage_relations } = typeData;
    //pokemon type data
    const pokemon = input.split(" ")[1];
    const pokemonData = await getPokemonJSON(pokemon);
    const { types } = pokemonData;
    //effectiveness comparison
    const damageCalc = calculateMultiplier(damage_relations, types);
    const effectiveness = effectivenessCalculator(damageCalc);
    //create embed
    const upperType = type.charAt(0).toUpperCase() + type.slice(1);
    const upperPokemon = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
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
        else if (halfDamageArray.includes(pokemonTypes[i].type.name)) {
            damageCalc *= .5;
        }
        else if (noDamageArray.includes(pokemonTypes[i].type.name)) {
            damageCalc *= 0;
        }
    }
    return damageCalc;
}

function effectivenessCalculator(damageCalc) {
    var effectiveness;
    switch(damageCalc) {
        case 0:
            effectiveness = 'no effect';
            break;
        case .25:
        case .5:
            effectiveness = 'not very effective';
            break;
        case 1:
            effectiveness = 'effective';
            break;
        case 2:
        case 4:
            effectiveness = 'super effective';
            break;
    } 
    return effectiveness;
}

//=======================EXPORTS====================//
module.exports = { getVersusEmbed };
