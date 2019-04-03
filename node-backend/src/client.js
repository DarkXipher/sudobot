const Commando = require('discord.js-commando');
const PostgresProvider = require('./PostgresProvider.js');
const path = require('path');

class BotClient extends Commando.Client {
	constructor (webDB, token, ownerid, commandprefix, unknowncommandresponse) {
		super({
			"owner": (ownerid) ? ownerid : null,
			"commandPrefix": commandprefix,
			"unknownCommandResponse": unknowncommandresponse
		});
		this.webDB = webDB;
		this.token = token;
		this.isReady = false;
		this.commandPrefix = commandprefix
	}

	onReady () {
		return () => {
			console.log(`BotClient ready and logged in as ${this.user.tag} (${this.user.id}). Prefix set to ${this.commandPrefix}. Use ${this.commandPrefix}help to view the commands list!`);
			console.log(`Bot has started, with ${this.users.size} users, in ${this.channels.size} channels of ${this.guilds.size} guilds.`);
			this.user.setAFK(true);
			this.user.setActivity(`for ${this.commandPrefix}.`, {type : 'WATCHING'} );
			this.isReady = true;
		};
	}

	onCommandPrefixChange () {
		return (guild, prefix) => {
			console.log(`Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`} ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`);
		};
	}

	onDisconnect () {
		return () => {
			console.warn('Disconnected!');
		};
	}

	onReconnect () {
		return () => {
			console.warn('Reconnecting...');
		};
	}

	onCmdErr () {
		return (cmd, err) => {
			if (err instanceof Commando.FriendlyError)
				return;
			console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
		};
	}

	onCmdBlock () {
		return (msg, reason) => {
			console.log(`Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''} blocked; ${reason}`);
		};
	}

	onCmdStatusChange () {
		return (guild, command, enabled) => {
			console.log(`Command ${command.groupID}:${command.memberName} ${enabled ? 'enabled' : 'disabled'} ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`);
		};
	}

	onGroupStatusChange () {
		return (guild, group, enabled) => {
			console.log(`Group ${group.id} ${enabled ? 'enabled' : 'disabled'} ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`);
		};
	}

	onGuildCreate () {
    	return () => {//this even triggers when a bot joins a server
    		console.log(`New guild joined: ${guild.name} (id: ${guild.id}. This guild has ${guild.memberCount} members!`); 
			client.user.setActivity(`Serving ${client.guilds.size} servers`);
		};
	}

	onGuildDelete () {
		return () => {
			//this event triggers when a bot is removed from a server
			console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`)
			client.user.setActivity(`Serving ${client.guilds.size} servers`);
		};
	}

	onMessage () {
		return (msg) => {
			// nothing here yet
			
			// Lets keep track of who has been talking. We'll need to grab the msg author's ID/tag and store in database.

			//This will only trigger on each message. So hopefully the message has a datetime that we can compare to increase their points by.

			


		};
	}

	init () {
		// register our events for logging purposes
		this.on('ready', this.onReady())
			.on('commandPrefixChange', this.onCommandPrefixChange())
			.on('error', console.error)
			.on('warn', console.warn)
			//.on('debug', console.log)
			.on('disconnect', this.onDisconnect())
			.on('reconnecting', this.onReconnect())
			.on('commandError', this.onCmdErr())
			.on('commandBlocked', this.onCmdBlock())
			.on('commandStatusChange', this.onCmdStatusChange())
			.on('groupStatusChange', this.onGroupStatusChange())
			.on('guildCreate', this.onGuildCreate())
			.on('guildDelete', this.onGuildDelete())
			.on('message', this.onMessage());

		// set provider sqlite so we can actually save our config permanently
		this.setProvider(
			new PostgresProvider(this.webDB.getDB())
		);

		// first we register groups and commands
		this.registry
			.registerDefaultGroups()
			.registerGroups([
				['random', 'Random Commands'],
				['Economy', 'Commands relating to Inventory and Economy'],
				['ombi', 'Ombi'],
				['Games', 'Commands relating to interative systems to generate economy'],
				['tautulli', 'Tautulli']
			])
			.registerDefaultTypes()
			.registerDefaultCommands({
				'help': true,
				'prefix': true,
				'ping': true,
				'eval_': false,
				'commandState': true
			}).registerCommandsIn(path.join(__dirname, 'commands'));

			// unregister groups if apikey and host is not provided in web database
			// thanks to the commando framework we have to go the dirty way
			// this.registry.groups.forEach((group) => {
			// 	this.webDB.loadServiceSettings(group.name).then((result) => {
			// 		if(!result || (!result.host && !result.apikey)) {
			// 			group.commands.forEach((command) => {
			// 				this.registry.unregisterCommand(command);
			// 			});
			// 		}
			// 	}).catch(() => {});
			// });

		// login client with bot token
		return this.login(this.token);
	}

	deinit () {
		this.isReady = false;
		return this.destroy();
	}
}

module.exports = BotClient;