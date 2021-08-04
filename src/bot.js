require ('dotenv').config();
const { Client, MessageEmbed } = require('discord.js');
const { getEmbed } = require('./utils/getEmbeds');
const { getAbilityData } = require('./utils/Ability/getAbility');

const client = new Client();
client.login(process.env.BOT_TOKEN);
client.on('ready', () => console.log(`${client.user.tag} has logged in.`));

//=======================CommandSelector =====================//
client.on('message',async message => {
    if(message.author.bot) return;
    const commandIndex = commandSelector(message);
    const embed = await getEmbed(message, commandIndex);
    message.channel.send(embed);
});

function commandSelector(message) {
    if(message.content.toLowerCase().startsWith('$shiny')){
        commandIndex = 0;
    }
    if(message.content.toLowerCase().startsWith('$gifmon')){
        commandIndex = 1;
    }
    if(message.content.toLowerCase().startsWith('$stats')){
        commandIndex = 2;
    }
    if(message.content.toLowerCase().startsWith('$ability')){
        commandIndex = 3;
    }
    if(message.content.toLowerCase().startsWith('$abmon')){
        commandIndex = 4;
    }
    return commandIndex;
}

//==================================$ability command============================//
client.on('message',async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('$ability')){
        const abData = getAbilityData(message);
        const { effect_entries, name, } = abData;
        const effect = effect_entries[1].effect 
        const embed = new MessageEmbed();
        embed.setTitle(`${name}`);
        embed.addField('Effect', effect);
        message.channel.send(embed);
    }
});

//==================================$abmon command============================//
client.on('message',async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('$abmon')){
        const pokemon = message.content.split(" ")[1];
        const abData = await getPokemon(pokemon);
        const embed = new MessageEmbed();
        const { abilities, name, sprites, id, } = abData;
        embed.setTitle(`${name} #${id}`);
        embed.setThumbnail(`${sprites.front_default}`);
        abilities.forEach(async ability => {
            // const ab = await getAbility(ability.ability.name)
            embed.addField(ability.ability.name ,'HA: ' + ability.is_hidden)
        });
        message.channel.send(embed);
    }
});