const { Command } = require('discord.js-commando');
const { Database } = require('../../database.js');
const { Pool } = require('pg');

const connString = process.env.DATABASE_URL || 'postgres://localhost:5432/sudobot';


module.exports = class queryCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'query',
			group: 'random',
			memberName: 'query',
            description: 'Helper function to test the DB out',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR'],
            args: [
				{
					'key': 'sql',
					'prompt': 'query to run',
					'type': 'string'
				}]
        });
        
        this.db = new Pool({
            connectionString: connString
        });
	}

	run(message, args) {
        console.log(connString);
        if(!args.sql) {
            return message.reply('Please enter a valid query.');
        }
        console.log("Query being ran with args: " + args.sql);



		let result = this.db.query(args.sql)
		.then( res => {
			console.log(res);

			res.rows.forEach(function(row){
				console.log(row);
				message.say(JSON.stringify(row));
			});
		});
	}
};