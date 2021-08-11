require ('dotenv').config();
const { MessageEmbed } = require('discord.js');

//create a $help that displays all commands and viable input formats
function getHelpEmbed() {
    const embed = new MessageEmbed();
    embed.setTitle('Pokemon Info Bot Help Page');
    embed.addField('$shiny PokemonName', 'Displays the shiny form of the Pokemon with the regular form in the corner.');
    embed.addField('$gifmon PokemonName', 'Displays the gif of the given Pokemon.');
    embed.addField('$stats PokemonName', 'Displays the name, number, type, and base stats of the given Pokemon.');
    embed.addField('$ability AbilityName', 'Displays the description of the given Ability and what it does in the overworld.');
    embed.addField('$abmon PokemonName', 'Displays all possible abilities of the given Pokemon and their descriptions. Indicates HA as well.');
    embed.addField('$type TypeName', 'Displays the types that a given Type is strong or weak against.');
    embed.addField('$vs TypeName PokemonName', 'Displays the damage calculation of a given Type of move against a given Pokemon.')
    embed.addField('$help', 'You are here. :)');
    return embed;
}

//=======================EXPORTS====================//
module.exports = { getHelpEmbed };
