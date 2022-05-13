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
	
	// Important information from message
	var messageContent = message.content.toLowerCase();
	var command = messageContent.slice(2, messageContent.length);
	var commandPrefix = messageContent.slice(0, 2);

	// Split between admin and regular commands
	if (commandPrefix == adminPrefix) {
		adminCommands(message, command);
	}
	else if (commandPrefix == prefix) {
		regularCommands(message, command);
	}


});


function adminCommands(message, command) {
	// Restart bot
	if ((command == "restart" || command == "r") && message.author.id == "104935141465456640") {
		message.channel.send("Restarting...");
		console.log("Restarting bot");
		client.destroy();
	}

	//
}

function regularCommands(message, command) {
	// Help (embed)
	if (command == "help" || command == "h") {
		const helpMsg = {
			color: 0xffee57,
			title: 'Helping of help',
			description: 'The prefix is "y!"',
			fields: [{
					name: 'help / h',
					value: 'Get a helping of a helpful help message',
				}
			],
			timestamp: new Date(),
			footer: {
				text: 'Its a helping because you consume information',
			},
			// url: "https://www.youtube.com/watch?v=ulDp318GOj4"

		};


		message.channel.send({ embed: helpMsg });
	}
}

client.login(config.token);