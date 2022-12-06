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
	client.user.setActivity(`Being rebuilt from spare parts [${prefix}]`);
	console.log("");
	var today = new Date();
	var day = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
	var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
	let onTime = `${day} at ${time}`;
	fs.appendFileSync("logFile.txt", `Bot activated at ${onTime}` + "\n");
	// console.log(prefix + " " + adminPrefix);

});

//Start reading messages
client.on("message", (message) => {
	if (message.author.bot) return; // Ignore messages from bots


});


client.login(config.token);