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
            args: [
				{
					'key': 'choice',
					'prompt': 'query to run',
					'type': 'string'
				}]
        });
	}

	run(message, choice) {
		var arr = choice.split(/  +/);
        var results = Math.ceil(Math.random() * arr.length);
        results = arr[(results - 1)];
    
        message.channel.send(`${message.author.username}, I think **${results}** would be the best choice!`);
	}
};