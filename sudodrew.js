const Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

//configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {colorize : true});
logger.level = 'debug'

//initialize Discord bot
var bot = new Discord.Client({
    token : auth.token,
    autorun : true
});

bot.on('read', function(event) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function( user, userID, channelID, message, event) {
    // Our bot needs to know if it will execute a command
    //it will listen for messages that will start with '!'
    if(message.substring(0, 1) == '!') {
        var args = mesage.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            // !ping
            case "ping":
                bot.sendMessage({
                    to: channelID,
                    message: "Pong!"
                });
            break;
            // add more case commands here
        }
    }
});
