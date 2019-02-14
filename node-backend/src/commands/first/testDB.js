const { Command } = require('discord.js-commando');
const { Database } = require('../../database.js');
const { Pool } = require('pg');

const connString = process.env.DATABASE_URL || 'postgres://localhost:5432/sudobot';


module.exports = class testDBCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'testDB',
			group: 'first',
			memberName: 'testDB',
			description: 'Helper function to test the DB out',
        });
        
        this.db = new Pool({
            connectionString: connString
        });
	}

	run(message) {

        let result = this.db.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';");;


		return result.forEach( row => {
            message.say(row);
        });
	}
};