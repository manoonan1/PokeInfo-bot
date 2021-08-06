require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getAbilityArray } = require('./getAbility');
const { getPokemonData } = require('../Pokemon/getPokemon');

//index comes from bots.js commandIndex. For $abmon this value should be = 4
//=======================$abmon helper functions====================//

async function getAbmonEmbed(message){
    const embed = new MessageEmbed();
    const abData = await getPokemonData(message);
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

//=======================EXPORTS====================//
module.exports = { getAbmonEmbed };