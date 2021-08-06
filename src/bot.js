require ('dotenv').config();
const { Client } = require('discord.js');
const { getEmbed } = require('./utils/getEmbeds');

const client = new Client();
client.login(process.env.BOT_TOKEN);
client.on('ready', () => console.log(`${client.user.tag} has logged in.`));

//=======================CommandSelector =====================//
client.on('message',async message => {
    if(message.author.bot) return;
    if(!message.content.toLowerCase().startsWith('$')) return;
    const commandIndex = commandSelector(message);
    const embed = await getEmbed(message, commandIndex);
    message.channel.send(embed);
});

function commandSelector(message) {
    let commandIndex = 0;
    if(message.content.toLowerCase().startsWith('$shiny')){ //Example command: $shiny bulbasaur
        commandIndex = 0;
    }
    if(message.content.toLowerCase().startsWith('$gifmon')){ //Example command: $gifmon bulbasaur
        commandIndex = 1;
    }
    if(message.content.toLowerCase().startsWith('$stats')){//Example command: $stats bulbasaur
        commandIndex = 2;
    }
    if(message.content.toLowerCase().startsWith('$ability')){//Example command: $ability effect-spore
        commandIndex = 3;
    }
    if(message.content.toLowerCase().startsWith('$abmon')){//Example command: $abmon bulbasaur
        commandIndex = 4;
    }
    return commandIndex;
}