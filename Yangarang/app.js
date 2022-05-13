//Startup and shit
const Discord = require("discord.js");
const client = new Discord.Client();
var fs = require("fs");
var cron = require("cron");

// Set the variables for all
let prefix = "y!";
let adminPrefix = "y~";

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

	//If message from a bot, ignore
	if(message.author.bot) return;
	
	//Set up variables, name and lowercase message
	var fullUsername = message.author.username+"#"+message.author.discriminator;
	var msg = message.content.toLowerCase();

	console.log(fullUsername + " " + msg);
});



client.login("NDk4MzA1NTc4OTc2ODA0ODY1.DpsBWw.HEmRU4KNkhCgYfwQ-pexkGNhbMc");