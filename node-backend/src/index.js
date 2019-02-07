//Load up the discord.js library
const { CommandoClient } = require('discord.js-commando');
const path = require('path');

//This is the client
const client = new CommandoClient({
    commandPrefix: '?',
    owner: ''
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['first', 'First Command Group'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        'help': true,
        'prefix': true,
        'ping': true,
        'eval_': false,
        'commandState': true
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));



//Here we load the configurations
//contains token
//contains prefix
const config = require("./config.json");

//let us know when the bot is ready.
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`Serving ${client.guilds.size} servers with Commando`);
});

// output errors to console
client.on('error', console.error);

client.on("guildCreate", guild => {
    //this even triggers when a bot joins a server
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}. This guild has ${guild.memberCount} members!`); 
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
})

client.on("guildDelete", guild => {
    //this event triggers when a bot is removed from a server
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`)
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.login(config.token);

// client.on('message', async message => {
//     //this event will run on every single message from any channel or DM

//     //It's good practice to ignore other bots. This also makes your bot ignore itself
//     //and not get into a spam loop (we call that 'botception')
//     if(message.author.bot) return;

//     // Also good practice to ignore any message that does not start with our prefix
//     // which is set in the configuration file.
//     if(message.content.indexOf(config.prefix) !== 0) return;

//     // Here we separate our 'command' name and our 'arguments' for the command
//     // e.g. if we have the message "+say Is this the real life?", we'll get the following
//     // command = say
//     // args = ["is", "this", "the", "real", "life?"]
//     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
//     const command = args.shift().toLowerCase();

//     // Lets go with a few example commands:

//     if(command === "ping") {
//         // Calculates ping between sending a message and editing it. giving a nice round-trip latency
//         //The second ping is an average latency between the bot and the websocket server
//         //(one-way, not round-trip)
//         const m =  await message.channel.send("Ping?");
//         m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
//     }

//     if(command === "say") {
//         //makes the bot say something and delete the message. As an exmapke, its open to anyone to use
//         // To get the "message" itself we join the args back into a string with spaces.
//         const sayMessage = args.join(" ");
//         // then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
//         message.delete().catch(O_o=>{});
//         //and we get the bot to say the thing
//         message.channel.send(sayMessage);
//     }

//     if( command === "kick") {
//         //this command must be limited to mods and admins. In this example we just hardcode the role names.
//         //Please read on Array.some() to understand this bit
//         if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) ) {
//             return message.reply("Sorry, you don't have permissions to use this!");
//         }

//         //Let's first check if we have a member and ifwe can kick them!
//         //message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
//         // We can also support getting the member by ID, which would be args[0]
//         let member = message.mentions.members.first() || message.guild.members.get(args[0]);
//         if(!member)
//             return message.reply("Please mention a valid member of this server");
//         if(!member.kickable)
//             return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
        
//         //slice(1) removes the first part, which here should be the user mention or ID
//         // join(' ') takes all the various parts to make a single string
//         let reason = args.slice(1).join(' ');
//         if(!reason) reason = "No reason provided";
        
//         //Now, time for a swift kick in the nuts!
//         await member.kick(reason).catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));

//         message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
//     }

//     if(command === "ban") {
//         //Most of this command is identical to kick, except that here we'll only let admins do it.
//         // In the real world mods could ban too, but this is just an example, right?
//         if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) ) {
//             return message.reply("Sorry, you don't have permissions to use this!");
//         }
//         let member = message.mentions.members.first();
//         if(!member)
//             return message.reply("Please mention a valid member of this server!");
//         if(!member.bannable)
//             return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

//         let reason = args.slice(1).join(' ');
//         if(!reason) reason = "No reason provided";

//         await member.ban(reason).catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
        
//         message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
//     }

//     if(command === "purge"){
//         // This command removes all message from all users in the channel, up to 100.

//         //get the delete count, as an actual number.
//         const deleteCount = parseInt(args[0], 10);

//         //Oooh nice, combined conditions. <3
//         if(!deleteCount || deleteCount < 2 || deleteCount > 100) {
//             return message.reply(`Please provide a number between 2 and 100 for the number of messages to delete`);
//         }

//         //So we get our message, and delete them. Simple enough, right?
//         const fetched = await message.channel.fetchMessages({limit : deleteCount});
//         message.channel.bulkDelete(fetched).catch(error => message.reply(` Couldn't delete message because of : ${error}`));
//     }

//     if(command === "balance") {
//         //This command will retreive a user's economical value, and display it

//         //some considerations:
//         //This may want to be a private message, to allow us to implement a "steal" feature.

//         //The balance may not be completely represented in currency, as objects and other items may be factored in

//         //Because of the different objects, we need to specifically declare what these objects are used for, i.e. descriptions

//         //A way to initiate usage of these objects, or a way to declare that the owner would like to expend a resource

//         // A way to integrate with a server queue to notify what position an object is in being processed or how soon it will be.
//     }

//     if(command === "invoke-item") {
//         //This command will initiate usage of an item and put it into the server queue. From there an admin can update status or reject/approve as needed.
//         // This should keep track of the status and display it appropriately, as in the balance page.

        
//     }

// });

// client.login(config.token);