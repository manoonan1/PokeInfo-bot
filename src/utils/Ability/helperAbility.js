require ('dotenv').config();
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { getAbilityInfo } = require('./getAbility');

//index comes from bots.js commandIndex. For $ability this value should be = 3
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