/**
@author oveeauki
@description IhanHienoSääBotti V2 (not final)
                                   	         **/
import {OpenAIApi,Configuration} from "openai"
import * as Discord from "discord.js"
import cf from "../Config/config.json" assert {type:"json"}
import {stdin,stdout,exit} from "process"
import hasha from "hasha"
import axios from "axios"

const openaiconf = new Configuration({apiKey:"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"});
const op = new OpenAIApi(openaiconf);
const client = new Discord.Client();
const Weather_API_t = cf.Weatherapi_t;
var prfx = "!";

client.login(cf.token);

class AIAPI {
constructor(input){
this.inp = input;
} 
async apifetch(){
  const resp = await op.createCompletion({
  model: "text-davinci-003",
  prompt: `${this.inp}`,
  temperature: 0,
  max_tokens: 2000,
}).then(respp => {
  this.anws = JSON.stringify(respp.data.choices[0].text).replace(/\\n/g,'\n').replace(/^(["]|\s|\\n|\.)*|["]$/g,'');
  this.me = `\`\`\`\n${this.anws}\n\`\`\``;
});
}
}

let disp = () => {
stdout.write(
`Botti Status [Ready]
Botti ID [${client.user.id}]
Botti is in [${client.guilds.cache.size}] Servers
Botti Nick [${client.user.username}]
/********************************************/\n`);
}

client.once("ready",async() => {
  console.clear(); 
    disp();
      await client.user.setActivity("Sää");      
      await client.user.setPresence({status:"dnd"});
});

client.on("message",async(message) => {
const msgfinal = message.content.replace(/([!])/,"");
let viesti = msgfinal.split(" ");
const myid = "300648311067508754";
/*--------------------------------Message Channel BulkDelete----------------------------------------*/
if(viesti[0] == "." && viesti[1] == "delete" && message.author.id == myid){
 try{
  const parsed = message.content.match(/\d+/);
  const int = parseInt(parsed);
  message.channel.bulkDelete(int+1);
  message.channel.send(`I deleted [${int}] messages`).then(msg => msg.delete({timeout:10000}));
 }catch{Error}
 }
/* ----------------------- Open Ai API --------------------------------------------------------------- */
if(message.content.startsWith(prfx) && message.content.length > 2){
  message.channel.startTyping();
  try{
    let api = new AIAPI(msgfinal);
    await api.apifetch();
    await message.reply(api.me);
    }catch{Error} 
    message.channel.stopTyping();
}
else if(message.content.startsWith(prfx) && message.content.length <= 2){
  message.reply("<:joo:1039729807933579274>");
}
/* -------------------------- Hashing ----------------------------------- */
if(viesti[0] == "." && viesti[1] == "hash" && !message.author.bot){
  try{
    const hashed = hasha(viesti[2],({"algorithm":`${viesti[3]}`}));
    await message.reply(`hash of ${viesti[2]} in ${viesti[3]} is [${hashed}]`);
}catch{Error};
}
/* -------------------------- Weather ----------------------------------- */
if(viesti[0] == "." && viesti[1] == "weather" && !message.author.bot){
try{
  let __message;
    const choice = viesti[2];
    let url = `http://api.weatherapi.com/v1/current.json?key=${Weather_API_t}&q={${choice}}&aqi=no`
    const fetc = await axios.get(url).then(dat => {__message = dat.data});

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

const fin = `\`\`\`\n${_message_}\n\`\`\``;
await message.reply(fin);
}catch{Error}
}
});
