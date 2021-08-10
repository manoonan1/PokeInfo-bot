require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getAbilityInfo } = require('./GetAbility');

//=======================$ability helper functions====================//
async function getAbilityEmbed(message) {
    const embed = new MessageEmbed();
    const abilityInfo = await getAbilityInfo(message);
    const name = abilityInfo[0]; //name is stored at index 0
    const effect = abilityInfo[1]; //effect is stored at index 1 
    embed.setTitle(name);
    embed.addField('Effect', effect);
    return embed;
}

//=======================EXPORTS====================//
module.exports = { getAbilityEmbed };
