require ('dotenv').config();
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const { shinyURL, gifURL, statsEmbed } = require('./utils/getPokemon');
const { getAbility } = require('./utils/getAbility');


client.login(process.env.BOT_TOKEN);

client.on('ready', () => console.log(`${client.user.tag} has logged in.`));
client.on('message',async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('$shiny')){
        const url = await shinyURL(message);
        message.channel.send(url);
    }
});

client.on('message',async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('$gifmon')){
        const url = await gifURL(message);
        message.channel.send(url);
    }
});

client.on('message',async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('$stats')){
        const pokeData = await statsEmbed(message);
        message.channel.send(pokeData);
    }
});

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