/************************************************************************************/
const Discord = require('discord.js');
const client = new Discord.Client();
const configit = require('./Config/rönniconfiguraatio.json');
const oneliners = require('./Config/fraasit.json');
const emojit = require('./Config/emojit.json');
const moment = require('moment');
const {colors} = require('./omatmoduulit/escapecolors');
const {bogosembed} = require('./omatmoduulit/bogos')
var time = moment().format('LTS')
var {Randomi} = require('./omatmoduulit/Random');

/***********************************************************************************/
client.once('ready',async() => {
await client.user.setStatus("dnd");
await client.user.setActivity(oneliners.fraasit[Randomi],{type:"WATCHING"});
console.log(
'\033[32mbotti ready!\n\033[0m'+
'botti status : \033[34m['+client.user.presence.status+']\n\033[0m'+
'Rönnin ID : \033[34m['+client.user.id+']\n\033[0m'+
'Rönnin Tag : \033[34m['+client.user.tag+']\n\033[0m'+
'Rönnin Username(atm) : \033[34m['+client.user.username+']\n\033[0m'+
'Rönni sanoo : \033[34m['+ oneliners.fraasit[Randomi]+']\n\033[0m'+
'----------------------------------------------------------------');
});
/************************************************************************************/

client.on('message', async message => {
if(message.content === 'bogos'){
const msf = message.author.username
message.reply(bogosembed)
console.log(`${client.user.username} answered ${msf} @${time}`)
}

if(message.content.startsWith('poista') && message.author.id === '300648311067508754'){
const int = message.content.match(/\d+/)
const intparsed = parseInt(int)
message.channel.bulkDelete(intparsed)
message.reply(`Mää pistin meneen ${intparsed} viesti eestä !`)
message.channel.send('<:tita2:814269332829503498>')
console.log(`${client.user.username} Deleted [${intparsed}] messages @ ${message.channel.name}`)
}
else if(message.content.startsWith('poista') && message.author.id != '300648311067508754'){
message.reply(`Niin mitä ihmettäää? Vähän OutoOoO kun et voin käyttää tätä vai mitä ?\n`,bogos.bogosembed)
}
/* Logailua */
if(message.channel.type === 'dm'){
console.log(`${message.author.username} Sent a message : [${message.content}] @ ${time}`)
}
else if(message.channel.type === 'dm' && message.author.id === '189443359998214145'){
const lastmsgusr = message.channel.lastMessage.author.username
console.log(`${message.author.username} Sent a message : [${message.content}]`)
await client.users.cache.get(`${message.channel.lastMessage.author.id}`).send(oneliners.fraasit[Math.floor
(Math.random()*6)])
console.log(`Röndelssi Sent [${client.user.lastMessage.content}] To [${lastmsgusr}]`)      
}
else if(message.channel.type ==='text' && message.channel.id != '672891512240996409'){
console.log(`${message.author.username} @ ${message.channel.name} Sent : [${message.channel.lastMessage.content}]`)
}

if(message.content === 'jeee' && message.author.id === '300648311067508754'){
message.channel.send(emojit.aaro)
}
else if(message.content === 'moi' && message.author.id == '300648311067508754'){
(await client.users.fetch('237577351238516738')).send(bogosembed)
}

// Joinaaa
if (message.content === 'rönnisummonaus') {
await message.member.voice.channel.join();
console.log('Rönni joinas kanavalle : ['+message.member.voice.channel.name+']')
}
// Leavaaaaa
else if(message.content === 'rönnimenepois'){
message.member.voice.channel.leave();
console.log('Rönni leavas kanavalta : ['+message.member.voice.channel.name+']')
}

/************************************************************************************/ 
if(message.content === 'resetnick'){
await client.user.setUsername('Rönni')
console.log('Username resetattu takas : ['+client.user.username+']')
}
else if(message.content === 'changenick' && message.author === client.users.cache.get('300648311067508754')){
message.channel.send('je')
//client.user.setUsername(message.channel.lastMessage)
//message.channel.send("niccki on nytten "+ client.user.username)
}
else if(message.content === 'kanko'){
await client.user.setUsername('Kanko')
message.channel.send('Nyt oon kanko!\nNäin.')
console.log("Rönnin Nickki vaihtu nickkiin : ["+client.user.username+"]")
}

/*Reaktio
if(message.author === client.users.cache.get('300648311067508754')){
const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'aaro');
message.react(reactionEmoji).then(console.log('Rönni reagoi\n~',message.content))
}
*/
});

client.login(configit.token)
