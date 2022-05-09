const Discord = require("discord.js");
const {stdout} = require("process");
const client = new Discord.Client();
const {token} = require("./config.json");

client.login(token);

client.once("ready",async() => {
stdout.write("On\n\n"); 
await client.user.setStatus("dnd");
await client.user.setActivity("vittuilu")
});

client.on("message",message =>{
if(message.author.id == '237577351238516738' && !message.author.bot){
try{
message.reply("orrait").then(msg => {msg.delete({timeout:2000})});
}catch{Error}
}
});