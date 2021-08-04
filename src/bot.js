require ('dotenv').config();
const { Client, MessageEmbed } = require('discord.js');
const { getEmbed } = require('./utils/getEmbeds');
const { getAbility } = require('./utils/getAbility');

const client = new Client();
client.login(process.env.BOT_TOKEN);
client.on('ready', () => console.log(`${client.user.tag} has logged in.`));
let commandIndex = 0; 
//index indicates which command we're using -- if index is a parameter, then the commandIndex should be getting passed in the function call.
                //0: $shiny
                //1: $gifmon
                //2: $stats
//==================================$shiny command============================//
client.on('message',async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('$shiny')){
        commandIndex = 0;
        const embed = await getEmbed(message, commandIndex);
        message.channel.send(embed);
    }
});

//==================================$gifmon command============================//
client.on('message',async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('$gifmon')){
        commandIndex = 1;
        const url = await getEmbed(message, 1);
        message.channel.send(url);
    }
});

//==================================$stats command============================//
client.on('message',async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('$stats')){
        commandIndex = 2;
        const pokeData = await getEmbed(message, 2);
        message.channel.send(pokeData);
    }
});

//==================================$ability command============================//
client.on('message',async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('$ability')){
        const ability = message.content.split(" ")[1];
        const abData = await getAbility(ability);
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