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
	
	// Extract prefix
	var commandPrefix = message.content.toLowerCase().slice(0, 2);

	// Split between admin and regular commands
	if (commandPrefix == adminPrefix) {
		adminCommands(message);
	}
	else if (commandPrefix == prefix) {
		regularCommands(message);
	}


});


function adminCommands(message) {
	var messageContent = message.content.toLowerCase();
	var command = messageContent.slice(2, messageContent.length);

	// Restart bot
	if ((command == "restart" || command == "r") && message.author.id == "104935141465456640") {
		message.channel.send("Restarting...");
		console.log("Restarting bot");
		client.destroy();
	}

	//
}

function regularCommands(message) {
	var messageContent = message.content.toLowerCase();
	var fullCommand = messageContent.slice(2, messageContent.length);
	var splicedCommand = fullCommand.split(" ");
	var shortCommand = splicedCommand[0];
	var pastCommand = splicedCommand.slice(1, splicedCommand.length);

	// Help (embed)
	if (shortCommand == "help" || shortCommand == "h") {
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

	// uwu-ize
	else if (shortCommand == "uwu") {
		var uwuMsg = uwuize(pastCommand.join(" "));
		message.channel.send(uwuMsg);
	}
}

function uwuize(msg) {
	let newMsg = msg;
	newMsg = newMsg.replace(/l/g, "w");
	newMsg = newMsg.replace(/you /g, "uwu ");
	newMsg = newMsg.replace(/at/g, "awt");
	newMsg = newMsg.replace(/do /g, "duwu ");
	newMsg = newMsg.replace(/wiww/g, "will");
	newMsg = newMsg.replace(/i'ww/g, "i'll");
	newMsg = newMsg.replace(/r/g, "w");
	newMsg = newMsg.replace(/thewe/g, "dere");
	newMsg = newMsg.replace(/uwu’we/g, "ur'e");
	newMsg = newMsg.replace(/the /g, "da ");

	return newMsg;
}

client.login(config.token);