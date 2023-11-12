/**
@author 0xFreDi
@description HienoSääBotti Main Project
                                        **/
import {OpenAIApi,Configuration} from "openai"
import * as Discord from "discord.js"
import cf from "../Config/config.json" assert {type:"json"}
import {stdin,stdout,exit} from "process"
import hasha from "hasha"
import axios from "axios"

const openaiconf = new Configuration({apiKey:cf.OpenAI_t});
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
  const resp = await op.createCompletion({ // GPT-3
  model: "text-davinci-003",
  prompt: this.inp,
  temperature: 0.5,
  max_tokens: 4000
}).then(respp => {
  this.anws = JSON.stringify(respp.data.choices[0].text).replace(/\\n/g,'\n').replace(/^(["]|\s|\\n|\.)*|["]$/g,'');
  this.me = `\`\`\`\n${this.anws}\n\`\`\``;
});
}
async apigpt4(){ // GPT-4
  const gpt4req = await op.createChatCompletion({
    model: "gpt-4-1106-preview",
    messages: [{role:"user", content:this.inp}],
    temperature:0.5,
    presence_penalty:2,
    frequency_penalty:1
  })
  this.me = gpt4req.data.choices[0].message;
}
async dall_e(){
  const dalle = await op.createImage({
    model: "dall-e-3",
    prompt:this.inp,
    n:1,
    size:"1024x1024"
})
  this.me = dalle.data.data[0].url;
}
}

class timer{
  constructor(){
    this.dallecount = 0;
}
  timer___ ( ){
    const date = new Date();
    this.mins = date.getMinutes();
    this.hours = date.getHours();
    this.seconds = date.getSeconds();
    const total = `[${this.hours}:${this.mins}:${this.seconds}]`;
    if(this.mins == 59){
      this.dallecount = 0;
    }
    return(total);
    }

start(){
  this.timerid = setInterval(() => {
    const res = this.timer___();
 // console.log("%s\n%d",res,this.dallecount);
},500);
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

let _timer = new timer();

client.once("ready",async() => {
  console.clear(); 
  _timer.start();
  disp();
  await client.user.setActivity("Sää");      
  await client.user.setPresence({status:"dnd"});
});

client.on("message",async(message) => {
  const msgfinal = message.content.replace(/([!]|[.])/,"").toLowerCase();
  let viesti = msgfinal.toLowerCase();
  const myid = "300648311067508754";
/*--------------------------------Message Channel BulkDelete----------------------------------------*/
if(message.content.startsWith(".") && message.content.includes("delete") && message.author.id == myid){
  try{
    const parsed = message.content.match(/\d+/);
    const int = parseInt(parsed);
    message.channel.bulkDelete(int+1);
    message.channel.send(`I deleted [${int}] messages`).then(msg => msg.delete({timeout:10000}));
 }catch{Error}
 }
/* ----------------------- Open Ai API DALL-E --------------------------------------------------------------- */
if(message.content.startsWith(prfx) && msgfinal.includes("dalle") && _timer.dallecount <= 2){
  _timer.dallecount++;
  //console.log(_timer.dallecount)
  const shit = msgfinal.replace(/dalle/gi,'');
  let api = new AIAPI(shit);
   message.channel.startTyping();
    try{
      await api.dall_e();
      await message.reply({
        files:[{
          attachment:api.me,
          name:"image.png"
      }]
    });
      }catch{Error} 
    message.channel.stopTyping();
}
else if((message.content.startsWith(prfx) && msgfinal.includes("dalle")) && (_timer.dallecount > 2 && !message.author.bot)){
  const msg = `Max 3 Image limit. [${(60-_timer.mins)}] Mins left for reset...`;
  message.reply(msg).then(msg => msg.delete({timeout:10000}))
}
/* ----------------------- Open Ai API GPT3 --------------------------------------------------------------- */
if(message.content.startsWith(prfx) && !(msgfinal.includes("gpt4") || msgfinal.includes("dalle")) && message.content.length > 2){
  message.channel.startTyping();
  try{
    let api = new AIAPI(msgfinal);
    await api.apifetch();
    await message.reply(`${api.me}`);
    }catch{Error} 
    message.channel.stopTyping();
}
else if(message.content.startsWith(prfx) && message.content.length <= 2){
  message.reply("<:joo:1039729807933579274>");
}
/* ----------------------- Open Ai API GPT4 --------------------------------------------------------------- */
if(message.content.startsWith(prfx) && msgfinal.includes("gpt4") && message.content.length > 2){
  const shit = msgfinal.replace(/gpt4/gi,'');
  message.channel.startTyping();
  try{
    let api = new AIAPI(shit);
    await api.apigpt4();
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
if(message.content.startsWith(".") && msgfinal.includes("weather") && !message.author.bot){
  try{
      let __message;
      const choice = msgfinal.replace(/^(\.|weather)\s*/gi,'');
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
      let windkm = __message.current.gust_kph, windmph = __message.current.gust_mph
      let condition = __message.current.condition.text

      if(booleandayxd){
        booleandayxd = true;
      }
      else{
        booleandayxd = false;
      }

  const embed = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle(city)
  .addField('\u2022 Date',timesplitted[0],true)
  .addField('\u2022 Time (Local)',timesplitted[1],true)
  .addField('\u2022 Country',country)
  .addField('\u2022 Temperature',`(${C})°C  |  (${F})°F`,true)
  .addField('\u2022 Condition',condition,true)
  .addField('\u2022 Feels Like',`(${feels_c})°C | (${feels_f})°F`)
  .addField('\u2022 Region',region,true)
  .addField('\u2022 Visibility',`(${visikm})Km |(${visimiles}) Mi `,true)
  .addField('\u2022 Cordinates',`Latitude (${lat})° | Longitude(${lon})°`)
  .addField('\u2022 Wind Direction',wind_D,true)
  .addField('\u2022 Wind Speed',`(${windkm}) Km/h | (${windmph}) Mp/h`,true)
  .addField('\u2022 Humidity',`${humidity}%`)
  .addField('\u2022 UV Index',uv,true)
  .addField('\u2022 Is_Day Boolean xd',booleandayxd,true);

              await message.reply(embed);
}catch{Error};
}/*
else if(viesti[0] == "." && viesti[1].toLowerCase() == "forecast" && !message.author.bot){
try{
  let __message;
    const choice = viesti[2].toLowerCase();
    const days = viesti[3].toLowerCase();

      let url = `http://api.weatherapi.com/v1/forecast.json?key=${Weather_API_t}&q={${choice}}&days=${days}`
        const fetc = await axios.get(url).then(dat => {__message = dat.data});
        console.log(__message.is_day[0]);

         let city = __message.location.name,country = __message.location.country;
         let region = __message.location.region;

let _message__ = [
`\u27AA Country [${country}]
\u27AA City [${city}]
\u27AA Region [${region}]


`];
            const fin = `\`\`\`\n${_message__}\n\`\`\``;
              await message.reply(fin);
          
}catch{Error};

}
*/


});
