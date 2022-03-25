/*
        The
            [IhanHienoSää] 
                           Bot
                                    */

const Discord = require("discord.js");
const client = new Discord.Client();
const {Discord_t,Weather_API_t} = require("../Config/confs.json");
const request = require("request");
const {c} = require("../Modules/colors");
const hash = require("hasha");
const fs = require("fs");
const path = require("path");

client.login(Discord_t);

client.once("ready",async() => {
await client.user.setStatus("dnd");
await client.user.setActivity("Providing ihan hienoa säätä since yesss");
console.clear();
console.log(`
${c.blue}\tIhanHienoSääBot${c.reset}\n         Init ${c.green}Success${c.reset}!
/******************************/
Bot Status [${c.red}${client.user.presence.status}${c.reset}]
Bot is On [${client.guilds.cache.size}] Server\\s
Bot UserID [${client.user.id}]
Bot Username [${client.user.username}]
/******************************/\n`);
});

client.on("message",async message => {
let begin = message.content.split(" ");
if(message.channel.type == "dm" && !message.author.bot){
console.log(`[${message.author.username}] Sent : ${message.content}`)
message.channel.startTyping();
setTimeout(function ok(){
message.reply(`**Usage: Enter $weather <Location> 
at any channel in a server which the bot is part of.**`);
},2000);
message.channel.stopTyping();
}
if(message.content.startsWith("delete") && message.author.id === '300648311067508754'){
const int = message.content.match(/\d+/);
const parsed = parseInt(int);
message.channel.bulkDelete(parsed+1);
message.reply(`I deleted [${parsed}] message\\s !`).then(msg => {
msg.delete({ timeout: 9000 })});
console.log(`Deleted [${parsed}] Message\\s @ ${message.guild.name} (${message.channel.name})`);
}
if(begin[0] == "$writefile" && !message.author.bot){
fs.writeFile(`${begin[1]}.txt`,`${begin[2]}`,(err) => {
if(err)
    console.log(err);
console.log(`${message.author.username} Created file ${begin[1]} With Contents of [${begin[2]}]`);
message.reply("Created File");
});
}
else if(begin[0] == "$readfile" && !message.author.bot){
fs.readFile(`${begin[1]}.txt`,(err,data) => {
if(err)
    console.log(err);
else
    console.log(data.toString());
    message.reply(`contents of a message are **${data.toString()}**`)
    return(data.toString());
});
}
else if(begin[0] == "$listfiles" && !message.author.bot){
fs.readdir(`${path.join(__dirname),'./'}`,(err,files) =>{
if(err)
    return(err);
else
    for(let x in files){
    files[x] += aa;
    console.log(`${files[x]}`);
}
message.reply(`${aa}`);
});
}
if(begin[0] == "$hash" && begin[1] !== "--options"){
console.log(`Begin[0] == ${begin[0]} | Begin[1] == ${begin[1]}`);
let hashedvalue = hash(`${begin[1]}`,{algorithm:`${begin[2]}`});
console.log(`${message.author.username} Hashed Word [${begin[1]}] (${begin[2]}) = [${hashedvalue}]`);
message.reply(`The hashed value of [${begin[1]}] = [${hashedvalue}](${begin[2]})`);
}
else if(message.content.startsWith("$hash") && begin[1] == "--options" ){
message.reply("Hashing algorithms available are :```\u25B6 MD5\n\u25B6 SHA1\n\u25B6 SHA256```");
}

if(message.channel.type == 'text' && begin[0] == '$weather' && !message.author.bot){
let _Ch_ID = message.channel.id;
let kaupunki = message.content;
let choice = kaupunki.split(" ").pop();
console.log(choice[0],choice[1],choice[2]);
let url = `http://api.weatherapi.com/v1/current.json?key=${Weather_API_t}&q={${choice}}&aqi=no`

request(url,(err,res,body) => {
let __message = JSON.parse(body);
let city = __message.location.name, country = __message.location.country;
let region = __message.location.region, time = __message.location.localtime,timesplitted = time.split(" ");
let lat = __message.location.lat,lon = __message.location.lon;
let C = __message.current.temp_c, F = __message.current.temp_f;
let feels_c = __message.current.feelslike_c, feels_f = __message.current.feelslike_f;
let wind_D = __message.current.wind_dir; 
let visikm = __message.current.vis_km, visimiles = __message.current.vis_miles;
let booleandayxd = __message.current.is_day, humidity = __message.current.humidity;
let uv = __message.current.uv, atmosmb = __message.current.pressure_mb;

let _message_ = [
`\u27AA Country [${country}]
\u27AA City [${city}]
\u27AA Region [${region}]
\u27AA Date [${timesplitted[0]}]
\u27AA Local Time (${timesplitted[1]})
\u27AA Latitude (${lat})° | Longitude (${lon})°
\u27AA Atmosphere Pressure (${atmosmb}) Mbar
\u27AA Temperature (${C})°C | (${F})°F
\u27AA Feels Like (${feels_c})°C | (${feels_f})°F
\u27AA Wind Direction (${wind_D})
\u27AA Visibility (KM) (${visikm}) | (Miles) (${visimiles})
\u27AA Is_day Boolean xd  (${booleandayxd})
\u27AA Humidity (${humidity})%
\u27AA UV Index (${uv})
`];

if(err)
    console.log(`Tällänen Virhe xd [${err}]`);

else if(res.statusCode == 200 && !err){
    client.channels.cache.get(`${_Ch_ID}`).send(`**${_message_}**`);   
}
});
}
});
