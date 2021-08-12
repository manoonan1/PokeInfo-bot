require ('dotenv').config();
const { Client } = require('discord.js');
const { getEmbed } = require('./utils/GetEmbed');

const client = new Client();
client.login(process.env.BOT_TOKEN);
client.on('ready', () => console.log(`${client.user.tag} has logged in.`));

//=======================CommandSelector =====================//
client.on('message',async message => {
    if(message.author.bot) return;
    if(!message.content.toLowerCase().startsWith('$')) return;
    const content = message.content.toLowerCase().split(" "); // whole command as an array deliniated by spaces
    const command = content[0]; //first item in our message content should be $'text'
    content.shift(); //remove that first item off of the array
    const strContent = content.join(" "); //rejoin the rest of the array as a string
    const embed = await getEmbed(command, strContent);
    message.channel.send(embed);
});
