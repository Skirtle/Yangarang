//Startup and shit
const Discord = require("discord.js");
const client = new Discord.Client();
var fs = require("fs");
var cron = require("cron");


//Set IDs
const shadow = "121791598609694722";
const yang = "104935141465456640";
const sloth = "327590920180465665";
const badger = "248637966459600897";
const sohca = "175782271691915264";
const benji = "251797078722871296";
const marc = "200156494136606721";
const shawn = "586597278609965079";
const sean = "556512855684284466";
const bunny = "433717402983727105";

//Set list of commands
var acceptableOils = [" oil",'"oil',"*oil","/oil","~oil","_oil"];
var jokeList = [
"What's a faunus' favorite weapon?\nA CAT-apult!",
"I went to slap Blake's butt, but I realized slapping her Bellabooty wasn't very Weiss of me to do ;)",
"Last time I met Adam was during *arm*ageddon",
"I lost half my rights to bear arms",
"Security officers at Samsung are Guardians of the Galaxies\nSchnee what I did there?"];
var picList = ["https://imgur.com/pEkRlos.png","https://imgur.com/wRwMexr.png","https://imgur.com/fo1aMBx.png"];

var names = ["dalton","shadow","badger","benji","marc", "shawn", "sean"];
var ids = [yang, shadow, badger, benji, marc, shawn, sean];
var noDad = [bunny];

// Set the variables for all
let prefix = "y!";
let adminPrefix = "y~";

var prefixLen = prefix.length;
var adminPrefixLen = adminPrefix.length;

var botAdmins = [yang];
var botVerifieds = [yang, shadow, shawn];
var bannedChannels = ["753696773201199265", "753697461540749343", "753694589004808240"]

let nameChance = .10;
let uwuChance = .01;

const gym_reminders = "687017054070636604";
const dev_bot = "703127250555371589";


function billy() {
	var billyMsg = "Hey @everyone! It's 9:00 on a Saturday!\nhttps://www.youtube.com/watch?v=gxEPV4kolz0";
	client.channels.get("337830789553061889").send(billyMsg);
	client.channels.get("680947953069719576").send(billyMsg);
	
}
function daily() {
	var day = (new Date()).getDay();
	var randomList = ["25 Sit ups","25 Crunches","15 Push ups","45 Second plank","15 Tricep dips","0.5 mile walk/jog/run"];
	var exerciseList = ["50 Sit ups", "30 Push ups", "50 Squats", "60 Second plank", "30 tricep dips", "Nothing dedicated", "1 mile walk/jog/run"];
	var msg1 = randomList[Math.floor(Math.random()*randomList.length)];
	var msg2 = exerciseList[day];
	var tot = `Today's dedicated workout: ${msg2}\nToday's random workout: ${msg1}`;
	client.channels.get(gym_reminders).send(tot);
}

//optionalSecond minute hour dayOfMonth month dayOfWeek
var billyJoel = new cron.CronJob('00 00 21 * * 6', billy); 
var dailyWorkout = new cron.CronJob('00 00 12 * * *', daily);



function startCron() {
	billyJoel.start();
	dailyWorkout.start();
}
function stopCron() {
	billyJoel.stop();
	dailyWorkout.stop();
	
}

function uwuize(msg) {
	let newMsg = msg;
	newMsg = newMsg.replace(/l/g, "w");
	newMsg = newMsg.replace(/r/g, "w");
	newMsg = newMsg.replace(/you /g, "uwu ");
	newMsg = newMsg.replace(/at/g, "awt");
	newMsg = newMsg.replace(/do /g, "duwu ");
	newMsg = newMsg.replace(/wiww/g, "will");
	newMsg = newMsg.replace(/i'ww/g, "i'll");
	newMsg = newMsg.replace(/uwu’we/g, "ur'e");
	return newMsg;
}

function adminComm(msg,message,fullName) {
	msg=msg.slice(adminPrefixLen,message.content.length);
	
	//Restart bot
	if (msg=="restart" || msg=="r") {
		stopCron();
		message.channel.send("Restarting...");
		console.log("Restarting bot");
		client.destroy();
	}
	
	//Todo list
	else if (msg.startsWith("ptodo")) {
			var fullToDoList = msg.split(" ");
			var toDoComm = fullToDoList[1];
			var addedMsg = fullToDoList.splice(2,fullToDoList.length);
			addedMsg=addedMsg.join(" ")
			
			
			if (toDoComm=="add") {
				if (addedMsg.length==0) {
					message.channel.send("add something retard");
				}
				else {
					message.channel.send(`Your personal to-do list has been updated with "${addedMsg}"!`);
					fs.appendFileSync("ptodoList.txt", addedMsg+"\n")
				}
			}
			
			
			else if (toDoComm=="list") {
				fs.readFile('ptodoList.txt',"utf8", function (err, data) {
                    if (err) throw err;
					if (data=="") {
						message.channel.send("There is nothing in the personal to-do list!")
						return
					}
					console.log(data);
					message.channel.send(data);
				});
			}
			
			else if (toDoComm=="help") {
				message.channel.send(
				"**add** {message}: Adds {message} to the todo list"+"\n"+
				"**list**: Sends a list of all personal to-do items"+"\n"+
				"**help**: Sends this help message"+"\n");
			}
				
		}

		else if (msg.startsWith("todo")) {
			var fullToDoList = msg.split(" ");
			var toDoComm = fullToDoList[1];
			var addedMsg = fullToDoList.splice(2,fullToDoList.length);
			addedMsg=addedMsg.join(" ")
			
			
			if (toDoComm=="add") {
				if (addedMsg.length==0) {
					message.channel.send("add something retard");
				}
				else {
					message.channel.send(`To-do list has been updated with "${addedMsg}"!`);
					fs.appendFileSync("todoList.txt", addedMsg+"\n")
				}
			}
			
			
			else if (toDoComm=="list") {
				fs.readFile('todoList.txt',"utf8", function (err, data) {
                    if (err) throw err;
					if (data=="") {
						message.channel.send("There is nothing in the to-do list!")
						return
					}
					console.log(data);
					message.channel.send(data);
				});
			}
			
			else if (toDoComm=="help") {
				message.channel.send(
				"**add** {message}: Adds {message} to the todo list"+"\n"+
				"**list**: Sends a list of all todo items"+"\n"+
				"**help**: Sends this help message"+"\n");
			}
				
		}
	
	//Admin help
	else if (msg=="help" || msg=="h") {
		message.channel.send(
		"**restart/r [ADMIN]**: Restarts the bot"+"\n"+
		"**help/h [VERIFIED+]**: Sends a list of all admin commands"+"\n"+
		"**logMessage [VERIFIED+]**: Logs a message to the console for debugging purposes"+"\n"+
		"**todo [ADMIN]**: Do "+`"${adminPrefix}todo help" `+"for information about todo");
	}
	
	//Todo list
	else if (msg.startsWith("spam")) {
			var fullToDoList = msg.split(" ");
			var amt = fullToDoList[1];
			var addedMsg = fullToDoList.splice(2,fullToDoList.length);
			addedMsg=addedMsg.join(" ")
			
			
			if (!isNaN(amt)) {
				if (addedMsg.length==0) {
					message.channel.send("add something retard");
				}
				else {
					for (i = 0; i<parseInt(amt,10); i++) {
						message.channel.send(`${i+1} ${addedMsg}`);
					}
				}
			}
			message.channel.send("Le spammery is over");
				
		}
	//Clear console
	else if (msg=="cls") {
		console.clear();
		console.log("Console cleared");
		message.channel.send("Console cleared");
	}

	else if (msg.startsWith("sendmsg ")) {
		msg = msg.slice(8, msg.length);
		var channelID = msg.slice(0, 18)
		msg = msg.slice(19, msg.length);
		try {
			client.channels.get(channelID).send(msg);
		}
		catch(error) {
			message.channel.send("Invalid channel ID, try again");
			console.log(channelID, typeof(channelID));
		}

	}

	else if (msg == "forceworkout") {
		message.channel.send("Forcing workout message for the day");
		daily();
	}
	
	
	//Send to veriComms()
	else {
		veriComms(msg,message,fullName);
	}
}

function veriComms(msg,message,fullName) {
	//Verified help
	if (msg=="help" || msg=="h") {
		message.channel.send(
		"**restart/r [ADMIN]**: Restarts the bot"+"\n"+
		"**help/h [VERIFIED+]**: Sends a list of all admin commands"+"\n"+
		"**logMessage [VERIFIED+]**: Logs a message to the console for debugging purposes"+"\n"+
		"**todo [ADMIN]**: Do "+`"${adminPrefix}todo help" `+"for information about todo");
	}
	
	//Submit
	if (msg.startsWith("submit")) {
		let submission = message.content.slice(8,message.content.length);
		if (submission=="" || submission==" ") {
			message.channel.send("Actually send something, asshole");
		}
		else {
			fullMessage = `User ${fullName}'s submission: ${submission}`
			client.users.get(yang).send(fullMessage);
			message.channel.send(`Submission "${submission}" sent!`)
		}
	  
  }
  
  //Log message
	else if (msg=="logmessage") {
		console.log(message);
		message.channel.send("Message has been logged!");
	}
	
}

function regComm(msg,message,fullName) {
	msg=msg.slice(prefixLen,message.content.length);
	
	//Regular help
	if (msg=="help" || msg=="h") {
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
		message.channel.send({embed: helpMsg});
	}
	
	//Joke/pun
	else if (msg=="pun" || msg=="joke") {
	  let enablePics = true;
	  let jokeAmt = jokeList.length;
	  let picAmt = picList.length;
	  let randJoke = Math.floor(Math.random() * jokeAmt);
	  let randPic = Math.floor(Math.random() * picAmt);
	  message.channel.send(jokeList[randJoke])
	  
	  
	  
	  
	  //Picture
	  if (enablePics) {
	  message.channel.send({files: [(picList[randPic])]});
	  }
  }

	//Credit
	else if (msg=="credits") {
		message.channel.send(
		"Testers: ShadowCobra, LeBirb, DSlothySloth, TheUnoringinalBadger, NinjaDino13\n"+
		"Jokes/puns: DSlothySloth, Sohca");
	}

	//Ping
	else if (msg=="ping") {
		var time = new Date().getTime() - message.createdTimestamp;
		message.channel.send(time + " ms");
		
	}
	
	//Kick 
	else if (message.content.startsWith(prefix+"kick <@")) {
	  if (message.content[9]=="!") {
		  var kickedUser = message.content.slice(10,28);
	  }
	  else {
	      var kickedUser = message.content.slice(9,27);
	  }
	  
	  if (client.users.get(kickedUser).bot) {
		  return;
	  }
	  
	  if (kickedUser==String(message.author.id)) {
		  message.channel.send(`Hey, don't do that to yourself <${"@"+message.author.id}>!`);
	  }
	  else {
	      message.channel.send(`Hey, <@${kickedUser}>! You just got kicked :boot: by <${"@"+message.author.id}>!`);
	  }
  }
	
	//UwUizer
	else if (msg.startsWith("uwu")) {
		newMsg = msg.slice(4, msg.length+1);
		newMsg = uwuize(newMsg);
		message.channel.send(`<@${message.author.id}> said: ${newMsg}`);
		message.delete();
	}
	
	//Uptime
	else if (msg=="uptime" || msg=="ut") {
		let totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		let hours = Math.floor(totalSeconds / 3600) - days*24;
		totalSeconds %= 3600;
		let minutes = Math.round(Math.floor(totalSeconds / 60));
		let seconds = Math.round(totalSeconds % 60);
		let uptime = `Total uptime is: ${days}:${hours}:${minutes}:${seconds}`;
		message.channel.send(uptime)
	}
	else if (msg.startsWith("spoil ")) {
		msg = msg.slice(6, msg.length);
		newMsg = "";
		for (var i = 0; i<msg.length; i++) {
			newMsg = newMsg.concat("||", msg.charAt(i), "||");
		}
		message.channel.send(newMsg);
		message.delete();
	}

	else if (msg.startsWith("lmgtfy ")) {
		//https://lmgtfy.com/?q=what+in+the+hell
		msg = msg.slice(7, msg.length);
		var url1 = "https://lmgtfy.com/?q=";
		var url2 = msg.replace(/ /g, "+");
		var urlTotal = url1.concat(url2);



		message.channel.send(urlTotal);
	}
	
	//Color choosing
	else if (msg.startsWith("color")) {
		var arr = message.content.split(" ");
		var asHex, asRGB;
		if (arr.length < 3) {
			message.channel.send("Command useage: y!color [rgb, hex] [color]\n" +
			"If using RGB, use formatting (X,Y,Z) without spaces\n" + 
			"If using hexadecimal, use formatting #ABCDEF (either with or without #)");
			return;
		}
		let mode = arr[1];
		let color = arr[2];
		//message.channel.send("Mode: " + mode + "\nColor: " + color);

		if (mode == "rgb") {
			var cols = color.slice(1, color.indexOf(")")).split(",");
			var r,g,b;
			/*r = parseInt("0x" + cols[0], 16);
			g = parseInt("0x" + cols[1], 16);
			b = parseInt("0x" + cols[2], 16);*/
			r = parseInt(cols[0]);
			g = parseInt(cols[1]);
			b = parseInt(cols[2]);
			asHex = (r.toString(16) + g.toString(16) + b.toString(16)).toUpperCase();
			asRGB = `(${cols[0]},${cols[1]},${cols[2]})`;
		}
		else if (["hex", "hexadecimal", "hexa"].includes(mode)) {
			if (color.startsWith("#")) {
				color = color.slice(1);
			}
			var r,g,b;
			r = parseInt(color.slice(0,2), 16);
			g = parseInt(color.slice(2,4), 16);
			b = parseInt(color.slice(4,6), 16);
			//console.log(r,g,b);

			if (isNaN(r) || isNaN(g) || isNaN(b)) {
				message.channel.send("Invalid hexcode, try again with a proper hexidecimal color code");
				return;
			}
			else if (r > 255 || g > 255 || b > 255) {
				message.channel.send("One of the hex values are too high, please try again");
				return;
			}
			asHex = color;
			asRGB = `(${r},${g},${b})`;

		}
		else {
			message.channel.send("Invalid color mode. Valid color modes include the following\n" + 
			"**hex**, **hexa**, **hdexadecimal**, **rgb**");
		}

		message.channel.send(`Mode: ${mode}\nHex: #${asHex}\nRGB: ${asRGB}`);
		const colorMsg = {
			color: parseInt(asHex,16),
			title: "Here's your colors!",
			description: "As both hex and RGB",
			fields: [
				{
					name: 'Hexadecimal',
					value: asHex,
				},
				{
					name: 'RGB',
					value: asRGB,
				},
			],
			timestamp: new Date(),
			footer: {
				text: 'uwu',
			},
			image: {
				//url: `https://cdn.discordapp.com/attachments/703127250555371589/759619144408367104/unknown.png`,
				//y!color hex 9E9EAD
				url: `https://www.colorhexa.com/${asHex}`,
			},
			thumbnail: {
				url: `https://www.colorhexa.com/${asHex}`,
			}
		};
		message.channel.send({embed: colorMsg});
		//message.channel.send(`https://www.colorhexa.com/${asHex}`);
	}
}

function textComms(msg,message,fullName) {
	//Well
	if (msg=="well" || msg=="well...") {
		console.log("f");
		message.channel.send({files: ["https://imgur.com/nne9Edc.png"]});
  }
	
	//Rly
	else if (msg=="rly" || msg=="rly?") {
		message.channel.send("rly maeks u tink!!");
	}
	
	//I see
	else if (msg=="i see" || msg=="i see...") {
		message.channel.send("Yarr, you are the sea?!");
	}

	//Oil
	else if (msg.includes("oil")){
	  for (let i = 0; i<acceptableOils.length;i++) {
		  if (msg.includes(acceptableOils[i]) || msg=="oil") {
			message.channel.send("DID I HEAR OIL?!",{files: ["https://imgur.com/3njflf9.png"]});
			break;
		  }
	  }
  }

	//Dad joke
	else if (msg.startsWith("i am ") || msg.startsWith("i'm ") || msg.startsWith("im ") || msg.startsWith("l'm ") || msg.startsWith("lm ") || msg.startsWith("l am")){
	  let cheeky = false
	  if (noDad.includes(message.author.id)) {
		  return;
	  }



	  if (msg.startsWith("i am ")) {
		  dadMsg = message.content.slice(5,message.content.length);
	  }
	  else if (msg.startsWith("i'm ")) {
		  dadMsg = message.content.slice(4,message.content.length);
	  }
	  else if (msg.startsWith("im ")) {
		  dadMsg = message.content.slice(3,message.content.length);
	  }
	  else if (msg.startsWith("lm ") || msg.startsWith("l'm ") || msg.startsWith("l am ")) {
		  dadMsg = message.content.slice(3,message.content.length);
		  cheeky = true;
	  }
	  
	  if (cheeky) {
		  message.channel.send(`Hi ${dadMsg}, I'm Yang! Also, you can't try to hide from the joke. Take another L, since you like to use them`);
	  }
	  else {
		  message.channel.send(`Hi ${dadMsg}, I'm Yang!`);
	  }
  }

	//nn
	else if (msg=="nn") {
		message.channel.send(`night night, <@${message.author.id}>!`);
	}
	
	//has penis, say haha penis
	else if (msg.includes("penis")) {
		message.channel.send("haha penis");
	}
	
	//absolute buffoon
	else if (msg.includes("you fool")) {
		message.channel.send({files: ["https://i.imgur.com/gRoKY7Z.jpg"]});
	}
	
	//gm command
	else if (msg=="gm") {
		message.channel.send(`Good morning, <@${message.author.id}>!`)
	}
	
	//fuck you = hoes mad
	else if (msg=="fuck you") {
		message.channel.send("hoes mad");
	}

	//thanks babe
	else if (msg=="thanks babe" && message.author.id==yang) {
		message.channel.send("no problem!");
	}

	//bad bot
	else if (msg=="bad bot") {
		message.channel.send(":(");
	}

	//good bot
	else if (msg=="good bot") {
		message.channel.send(":)");
	}

	
	//name ping chance
	for (var i = 0; i < names.length; i++) {
		if (msg.includes(names[i])) {
			let c = Math.random();
			if (nameChance>=c) {
				message.channel.send(`<@${ids[i]}>! You have been mentioned!`);
			}
		}
	}
	
	let c = Math.random();
	if (uwuChance>=c) {
		let newMsg = uwuize(msg);
		message.channel.send(`<@${message.author.id}> said: ${newMsg}`);
		message.delete();
	}
	
	
}


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