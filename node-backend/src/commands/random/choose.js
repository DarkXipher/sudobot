const { Command } = require('discord.js-commando');

module.exports = class chooseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'choose',
			group: 'random',
			memberName: 'choose',
            description: 'The one stop picker for hard choices!',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR'],
            
        });
	}

	run(message, [...choice]) {
		console.log(choice);
		var arr = choice.split(" ");
        var results = Math.ceil(Math.random() * choice.length);
        results = choice[(results - 1)];
    
        message.channel.send(`${message.author.username}, I think **${results}** would be the best choice!`);
	}
};