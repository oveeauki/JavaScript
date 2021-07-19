/************************************************************************************/
const Discord = require('discord.js');
const client = new Discord.Client();
const configit = require('./Config/rönniconfiguraatio.json');
const oneliners = require('./Config/fraasit.json');
const emojit = require('./Config/emojit.json');
const {colors} = require('./omatmoduulit/escapecolors');
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
if(message.content === 'millanen chillailu?'){
message.channel.send('tälläne chillailu ! <@189443359998214145> ',{
files:[
'https://cdn.discordapp.com/attachments/343890302781620226/863565315736207370/unknown.png'
]
}).then(console.log).catch(console.error);
}

if(message.channel.type === 'dm' && message.author.id === '300648311067508754'){
const lastmsgusr = message.channel.lastMessage.author.username
console.log(`${message.author.username} Sent a message : [${message.content}]`)
await client.users.cache.get(`${message.channel.lastMessage.author.id}`).send(oneliners.fraasit[Math.floor(Math.random()*6)])
console.log(`Röndelssi Sent [${client.user.lastMessage.content}] To [${lastmsgusr}]`)      
}

if(message.content === 'jeee' && message.author.id === '300648311067508754'){
const fraasit = {
0:"Tämä on A",
1:"Tämä on B",
2:"Tämä on C"
};
for(var i=0;i<3;i++){
message.channel.send(fraasit[Math.floor(Math.random()*3)])
}
message.channel.send(emojit.aaro)
}

if(message.content === 'moi rönni' && message.author.id == '300648311067508754'){
for(var i =0;i<5;i++){
(await client.users.fetch('300648311067508754')).send('staattinenpitkätupla')
}
}

// Joinaaa
if (message.content === 'rönnisummonaus') {
const yheteys = await message.member.voice.channel.join();
console.log('Rönni joinas kanavalle : ['+message.member.voice.channel.name+']')
}
// Leavaaaaa
else if(message.content === 'rönnimenepois'){
message.member.voice.channel.leave();
console.log('Rönni leavas kanavalta : ['+message.member.voice.channel.name+']')
}

/*@self Reaktio
if(message.author === client.users.cache.get('300648311067508754')){
const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'aaro');
message.react(reactionEmoji).then(console.log('Rönni reagoi\n~',message.content))
}
*/

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

/************************************************************************************/ 

if(message.content === '2'){
console.log(Number.isInteger(a))
}
});

client.login(configit.token);
