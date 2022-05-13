//Startup and shit
const Discord = require("discord.js");
const client = new Discord.Client();
var fs = require("fs");
var config = require('./config.json');

// Set the variables for all
let prefix = config.prefix;
let adminPrefix = config.adminPrefix;

var prefixLen = prefix.length;
var adminPrefixLen = adminPrefix.length;


//Log login in cmd and set activity on Discord
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity(`with my balls [${prefix}]`); 
	console.log("");
	var today = new Date();
	var day = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
	var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
	let onTime = `${day} at ${time}`;
	fs.appendFileSync("logFile.txt", `Bot activated at ${onTime}`+"\n");
  
});


//Start reading messages
client.on("message", (message) => {
	// Ignore bot messages
	if(message.author.bot) return;
	
	
	var fullUsername = message.author.username+"#"+message.author.discriminator;
	var msg = message.content.toLowerCase();
	var command = msg.slice(2, msg.length);

	// Split between admin and regular commands
	if (msg.slice(0, 1) == prefix) { }

	if ((command == "restart" || command == "r") && message.author.id == "104935141465456640") {
		message.channel.send("Restarting...");
		console.log("Restarting bot");
		client.destroy();
	}

	if (command == "help" || command == "h") {
		const helpMsg = {
			color: 0xffee57,
			title: 'You need help?!',
			description: 'The prefix is "y!"',
			fields: [
				{
					name: 'help',
					value: 'Get thismessage',
				},
				{
					name: 'joke/pun',
					value: 'Sends a joke',
				},
				{
					name: 'credits',
					value: 'Shows those who have helped',
				},
				{
					name: 'ping',
					value: 'Pong!',
				},
				{
					name: 'kick [user]',
					value: 'Boots them in the hiney',
				},
				{
					name: 'uwu [text]',
					value: 'Ever wanna just... UwU?',
				},
				{
					name: 'uptime/ut',
					value: 'How old even am I?',
				},
			],
			timestamp: new Date(),
			footer: {
				text: 'uwu',
			},
		};
		message.channel.send({ embed: helpMsg });
	}
});


client.login(config.token);