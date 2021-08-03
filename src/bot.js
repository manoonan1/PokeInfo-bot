require ('dotenv').config();
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const { getPokemon } = require('./utils/getPokemon')
const { getAbility } = require('./utils/getAbilities')

client.login(process.env.BOT_TOKEN);


client.on('ready', () => console.log(`${client.user.tag} has logged in.`));

client.on('message',async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('$shiny')){
        const pokemon = message.content.split(" ")[1];
        const pokeData = await getPokemon(pokemon);
        const { id } = pokeData;
        const photoId = `${id}`
        const zeroPad = (num, places) => String(num).padStart(places, '0')
        strId = zeroPad(photoId, 4)
        message.channel.send("https://files.pokefans.net/sprites/home/" + strId + "-000-shiny.png");
    }
});

client.on('message',async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('$gifmon')){
        const pokemon = message.content.split(" ")[1];
        const pokeData = await getPokemon(pokemon);
        const { name } = pokeData;
        const gifName = `${name}`
        console.log(gifName)
        message.channel.send("https://projectpokemon.org/images/normal-sprite/" + gifName + ".gif");
    }
});

client.on('message',async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('$stats')){
        const pokemon = message.content.split(" ")[1];
        const pokeData = await getPokemon(pokemon);
        const { sprites, stats, name, id } = pokeData;
        const embed = new MessageEmbed();
        embed.setTitle(`${name} #${id}`);
        embed.setThumbnail(`${sprites.front_default}`);
        stats.forEach(stat => embed.addField(stat.stat.name, stat.base_stat));
        message.channel.send(embed);
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