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
let _mssg = message.channel.id;
let kaupunki = message.content;
let choice = kaupunki.split(" ").pop();
let url = `http://api.weatherapi.com/v1/current.json?key=${Weather_API_t}&q={${choice}}&aqi=no`

request(url,(err,res,body) => {

let message = JSON.parse(body);
let city = message.location.name, country = message.location.country;
let region = message.location.region, time = message.location.localtime;
let C = message.current.temp_c, F = message.current.temp_f;
let feels_c = message.current.feelslike_c, feels_f = message.current.feelslike_f;
let wind_D = message.current.wind_dir; 
let visikm = message.current.vis_km, visimiles = message.current.vis_miles;
let booleandayxd = message.current.is_day, humidity = message.current.humidity;
let uv = message.current.uv, atmosmb = message.current.pressure_mb;

let _message_ = [
`Country [${country}]
City [${city}]
Region [${region}]
Local Time[${time}]
Atmosphere Pressure [${atmosmb}] Mbar
Temperature (${C})°C | (${F})°F
Feels Like (${feels_c})°C | (${feels_f})°F
Wind Direction [${wind_D}]
Visibility (KM) [${visikm}] | (Miles) [${visimiles}]
Is_day Boolean xd  [${booleandayxd}]
Humidity (${humidity})%
UV Index [${uv}]
`];
if(err)
    console.log(`Tällänen Virhe xd [${err}]`);

else if(res.statusCode == 200 && !err){
    client.channels.cache.get(`${_mssg}`).send(`**${_message_}**`);
}
});
}
});
