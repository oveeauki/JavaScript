/*
        The
            [IhanHienoSää] 
                           Bot
                                    */

const Discord = require("discord.js");
const client = new Discord.Client();
const {token} = require("../Config/confs.json");
const request = require("request");
const {c} = require("../Modules/colors");

client.login(token);

client.once("ready",async() => {
await client.user.setStatus("dnd");
await client.user.setActivity("Providing ihan hienoa säätä since yesss");
console.clear();
console.log(`
${c.blue}\tIhanHienoSää${c.reset}\n     Bot Init ${c.green}Success${c.reset}!
/******************************/
Bot Status [${c.red}${client.user.presence.status}${c.reset}]
Bot is On [${client.guilds.cache.size}] Servers
Bot UserID [${client.user.id}]
Bot Username [${client.user.username}]
/******************************/\n`);
});

client.on("message",async message => {
if(message.content.startsWith("delete") && message.author.id === '300648311067508754'){
const int = message.content.match(/\d+/);
const parsed = parseInt(int);
message.channel.bulkDelete(parsed+1);
message.reply(`I deleted [${parsed}] message\\s !`).then(msg => {
msg.delete({ timeout: 9000 })});
console.log(`Deleted [${parsed}] Message\\s @ ${message.guild.name} (${message.channel.name})`);
}
let begin = message.content.split(" ");
if(message.channel.type == 'text' && begin[0] == '$weather' && !message.author.bot){
let kaupunki = message.content;
let choice = kaupunki.split(" ").pop();
let url = `http://api.weatherapi.com/v1/current.json?key=6a7bd706269244acbc5194631220603&q={${choice}}&aqi=no`
request(url,(err,res,body) => {

if(err)
    console.log(`Tällänen Virhe xd [${err}]`);

else if(res.statusCode == 200 && !err){
    let message = JSON.parse(body);
    let city = message.location.name;
    let country = message.location.country;
    let region = message.location.region;
    let time = message.location.localtime;
    let C = message.current.temp_c; let F = message.current.temp_f;
    let wind_D = message.current.wind_dir; 
    let visikm = message.current.vis_km; let visimiles = message.current.vis_miles;
    let booleandayxd = message.current.is_day;
    let humidity = message.current.humidity;
    let uv = message.current.uv;

client.channels.cache.get("896772816022691870").send(`
Country [${country}]
City [${city}]
Region [${region}]
Local Time[${time}]
Temperature (${C})°C | (${F})°F
Wind Direction [${wind_D}]
Visibility (KM) [${visikm}] | (Miles) [${visimiles}]
Is_day Boolean xd  [${booleandayxd}]
Humidity (${humidity})%
UV Index [${uv}]`);
}
});
}
});