//Load up the discord.js library
const Discord = require('discord.io');

//This is the client
const client = new Discord.Client();

//Here we load the configurations
//contains token
//contains prefix
const config = require("./config.json");

client.on('ready', () => {
    console.log('Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.');
    console.log('Logged in as ${client.user.tag}!');
});

client.on('message', msg => {
    if(msg.content === 'ping') {
        msg.reply('pong')
    }
});

client.login('token');