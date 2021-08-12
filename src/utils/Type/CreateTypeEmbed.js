require ('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getTypeJSON, getDamageArray } = require('./GetType');

//=======================$typeAd helper functions====================//
async function getTypeEmbed(type) {
    const embed = new MessageEmbed();
    const typeData = await getTypeJSON(type);
    const { name, damage_relations } = typeData;
    const double = damage_relations.double_damage_to;
    const half = damage_relations.half_damage_to;
    const notEffective = damage_relations.no_damage_to;
    const doubleDamageArray = getDamageArray(double);
    const halfDamageArray = getDamageArray(half);
    const noDamageArray = getDamageArray(notEffective);
    embed.setTitle(`${name}`.toUpperCase());
    embed.addField('Super Effective Against', doubleDamageArray);
    embed.addField('Not Very Effective Against', halfDamageArray);
    embed.addField('No Damage Against', noDamageArray);
    return embed;
}

//=======================EXPORTS====================//
module.exports = { getTypeEmbed };