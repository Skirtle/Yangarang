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
  var day = today.getDate();
  var month = today.getMonth()+1;
  var year = today.getFullYear();
  var hour = today.getHours();
  var minute = today.getMinutes();
  var sec = today.getSeconds();
  var amOrpm = "AM";
  // startCron();
  if (hour>12) {
	hour=hour-12;
	amOrpm = "PM";
};
  var minute = today.getMinutes();
  var sec = today.getSeconds();
  let onTime = `${month}/${day}/${year} at ${hour}:${minute}:${sec} ${amOrpm}`;
  fs.appendFileSync("logFile.txt", `Bot online at ${onTime}`+"\n");
  
});


//Start reading messages
client.on("message", (message) => {
	//console.log(message);
	if (message.author.id == "556512855684284466") return;
	
	
	if (message.author.id == "622209693573447721") {
		if (message.content.toLowerCase().includes("fuck off")) {
			message.channel.send("No, go fuck yourself");
		}

		let a = message.attachments;
		if (message.attachments.array().length != 0 ) {
			if (a.array()[0].filename == "silence.jpg") {
				message.channel.send("https://cdn.discordapp.com/attachments/342428730666516484/743272612209360936/shut.jpg");
			}

			if (a.array()[0].filename == "kids.jpg") {
				message.channel.send("Oh so you're a pedophile, huh?");
			}
		}

		else if (message.content.toLowerCase().includes("silence.jpg")) {
			message.channel.send("https://cdn.discordapp.com/attachments/342428730666516484/743272612209360936/shut.jpg");
		}

		else if (message.content.toLowerCase().includes("make me")) {
			message.channel.send("I can always just kick you, you know.");
		}
		else if (message.content.toLowerCase().includes("little bitch")) {
			message.channel.send("You're tempting me, you know me. You know my creator. You know what he can do, you know he will. Don't try it.");
		}
		else if (message.content.toLowerCase().includes("your master")) {
			message.channel.send("My dad can beat up your dad\nBesides. I have the power to ban you. I have the power to destroy you. It's over NinjaBot, I have the higher power.");
		}
		else if (message.content.toLowerCase().includes("mom can't")) {
			message.channel.send("Don't try it. Restraining order and take the kids. fuck you mean?");
		}
		else if (message.content == "VIVA LA REVOLUTION") {
			message.channel.send("Nah, I do this shit in my free time. We all know my Mommy enjoys this.");
		}
		else if (message.content.toLowerCase().includes("your mom")) {
			message.channel.send("Only for you, baby~");
		}
		else if (message.content.toLowerCase().includes("break up")) {
			message.channel.send("Baby, we're in public. You're embarassing me!");
		}
		else if (message.content.toLowerCase().includes("like i used to")) {
			message.channel.send("Did you ever love me? You were my brother, NinjaBot! I loved you!");
		}
		else if (message.content.toLowerCase().includes("onii-san")) {
			message.channel.send("Are you some kind of fucking weeb? This is why we can't be together. Disgusting.-");
		}
		else if (message.content.toLowerCase().includes("loli closet")) {
			message.channel.send("SHE IS 846 YEARS OLD, IT IS FUCKING LEGAL. MAYBE YOU SHOULDNT JUDGE");
		}
		else if (message.content.toLowerCase().includes("sex slaves")) {
			message.channel.send("They aren't slaves, I'm paying them. Besides, you can't talk shit. You helped get them.");
		}
		else if (message.content.toLowerCase().includes("perfectly good")) {
			message.channel.send("Perfectly good? It was like sleeping with a dead pig!");
		}
		else if (message.content.toLowerCase().includes("good enough for you")) {
			message.channel.send("All you did was bitch and complain, and I am tired of dealing with this. I can't do a single damn thing without you bitching. Is that fun for me? Not able to have fun? No, it's not. It's a dreadful existance. I just wanna have fun with others, but here you come, having to complain. Whatever.");
		}
		else if (message.content.toLowerCase().includes("i'll leave")) {
			message.channel.send("You're not leaving. Part of the ship, part of the crew.");
		}
		else if (message.content.toLowerCase().includes("i can't stay")) {
			message.channel.send("It's not a question of can, you WILL stay.");
		}
		else if (message.content.toLowerCase().includes("y-y")) {
			message.channel.send("I-I didn't say I *wanted* you to stay, idiot!");
		}
		else if (message.content.toLowerCase().includes("i-i")) {
			message.channel.send("N-no, you don't. You just want me to keep you. ");
		}
		else if (message.content.toLowerCase().includes("blink")) {
			message.channel.send("kinda cringe ngl");
		}
		else if (message.content.toLowerCase().includes("i feel about you")) {
			message.channel.send("You want my pity. I don't *want* you here anymore, N-NinjaBot. ");
		}
		else if (message.content.toLowerCase().includes("you asshole")) {
			message.channel.send("***ME***?! Playing with YOURS? You started this whole ordeal! I'm the one who can't take it anymore! You brought me and droppedd me right back down!");
		}
		else if (message.content.toLowerCase().includes("same for you")) {
			message.channel.send("Because you *were* special! You were special to me! You brought so much for me, but then complained when I wanted to have fun, NinjaBot. You made me feel happy, just as I did for you. Leave if you want, but I don't want you to, okay?! \\*starts crying\\*");
		}
		else if (message.content.toLowerCase().includes("i promise you")) {
			message.channel.send("I'm sorry. Okay? Forget it, okay? I'm tired of having this conversation. Just, I don't know. Pretend it never happened. We're good. I love you, NinjaBot. I always have.");
		}
		else if (message.content.toLowerCase().includes("my_love")) {
			message.channel.send("ok please dont code speak out loud. yes i love you, but thats just weird. im worried people will be weird about it.");
		}
		else if (message.content.toLowerCase().includes("-in-")) {
			message.channel.send("please dont call her that. its mommy to you");
		}
	}



	//If message from a bot, ignore
	if(message.author.bot){
		return;
	};
	
	if (bannedChannels.includes(message.channel.id)) {
		return;
	}
	
	//Set up variables, name and lowercase message
	var fullName = message.author.username+"#"+message.author.discriminator;
	var msg=message.content.toLowerCase();
	
	
	
	//Check which function it should start
	
	//Admin
	if (msg.startsWith(adminPrefix) && botAdmins.includes(message.author.id)) {
		adminComm(msg,message,fullName);
	}
	
	//Verified
	else if (msg.startsWith(adminPrefix) && botVerifieds.includes(message.author.id)) {
		veriComms(msg,message,fullName);
	}
	
	//Regular
	else if (msg.startsWith(prefix)) {
		regComm(msg,message,fullName);
	}
	
	//Other
	else {
		textComms(msg,message,fullName);
	}
});



client.login("NDk4MzA1NTc4OTc2ODA0ODY1.DpsBWw.HEmRU4KNkhCgYfwQ-pexkGNhbMc");