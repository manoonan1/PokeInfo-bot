require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getAbilityInfo } = require('./GetAbility');
const { getPokemonJSON } = require('../Pokemon/GetPokemon');

//=======================$abmon helper functions====================//

async function getAbmonEmbed(message){
    const embed = new MessageEmbed();
    const abData = await getPokemonJSON(message);
    const { abilities, name, sprites, id, } = abData;
    const abArray = await getAbilityArray(abilities);//creates a 2D array [ [ab1Name, ab1Effect], [ab2Name, ab2Effect], etc ]
    embed.setTitle(`${name} #${id}`); //of the Pokemon
    embed.setThumbnail(`${sprites.front_default}`);
    for(let i = 0; i < abilities.length; i++){
        let indicator = " - slot: " + abilities[i].slot
        if(abilities[i].is_hidden == true) indicator = ' - HIDDEN';
        embed.addField(abArray[i][0] + indicator, abArray[i][1]);
    }
    return embed;
}

async function getAbilityArray(abilities){ 
    let abilityArray = [];
    for (let i = 0; i<abilities.length; i++){
        let message = { 'content': "$ability " + abilities[i].ability.name};
        abilityArray.push(await getAbilityInfo(message));
    }
    return abilityArray;
}

//=======================EXPORTS====================//
module.exports = { getAbmonEmbed };