/**
@author 0xFreDi
@description HienoSääBotti Main
@todo add chunk splitter as 2nd optional condition 
bc of message max length in discord api
                                                **/
import {OpenAI} from "openai"
import * as Discord from "discord.js"
import cf from "../Config/config.json" assert {type:"json"}
import {stdin,stdout,exit} from "process"
import axios from "axios"
import claude from "@anthropic-ai/sdk"
import {AIAPI,claudeaiapi,weatherapi} from "../Modules/apis.js" 
import crypto from "node:crypto" 

const aicli = new OpenAI({apiKey:cf.OpenAI_t});
const client = new Discord.Client();
const _claudeai = new claude({apiKey:cf.claudeai_t});

var prfx = "!";

client.login(cf.token);

class timer{
  constructor(){
    this.dallecount = 0;
}
  timer___ (){
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
  const msgfinal = message.content
                  .replace(/[!.]/i,"")
                  .trim()
                  .toLowerCase();
  const opts = ["gpt4","dalle","hash","claude"]
  let viesti = message.content.split(" ")
  const myid = "300648311067508754";
  const choice = msgfinal.replace(/^(w\s+|weather\s*)/i,'').trim();
/*--------------------------------Message Channel BulkDelete----------------------------------------*/
  if((message.content.startsWith(".") && msgfinal.includes("delete")) && message.author.id == myid){
    try{
      const parsed = message.content.match(/\d+/);
      const int = parseInt(parsed);
      message.channel.bulkDelete(int+1);
      message.channel.send(`I deleted [${int}] messages`).then(msg => msg.delete({timeout:10000}));
  }catch{Error}
  }
  else if(message.content.startsWith(".") && msgfinal.includes("delete") && message.author.id !== myid){
    message.reply("<:bro:968649274281840640>")
  }
/* ----------------------- Open Ai API DALL-E --------------------------------------------------------------- */
  if((message.content.startsWith(prfx) && msgfinal.startsWith("dalle")) && _timer.dallecount <= 2){
    _timer.dallecount++;
    //console.log(_timer.dallecount)
    const shit = msgfinal.replace(/dalle/i,'').trim();
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
  else if((message.content.startsWith(prfx) && msgfinal.startsWith("dalle")) && (_timer.dallecount > 2 && !message.author.bot)){
    const msg = `Max 3 Image limit. [${(60-_timer.mins)}] Mins left for reset...`;
    message.reply(msg).then(msg => msg.delete({timeout:10000}))
  }
/*----------------------------------------------------------------------------------------------*/

/*--------------------Claude Ai-------------------------------------------------------------*/
  if((message.content.startsWith(prfx) && msgfinal.startsWith("claude")) && message.content.length > 2){
    const shit = msgfinal.replace(/claude/i,'');
    message.channel.startTyping();
    try{
      let aiclaude = new claudeaiapi(shit)
      await aiclaude.claudefetch();
      await message.reply(aiclaude.me);
      }catch{Error} 
      message.channel.stopTyping();
  }
/* ----------------------- Open Ai API GPT3 --------------------------------------------------------------- */
  if((message.content.startsWith(prfx) && !opts.some(opt => msgfinal.startsWith(opt))) && message.content.length > 2){
    message.channel.startTyping();
    try{
      let api = new AIAPI(msgfinal);
      await api.apifetch();
      await message.reply(api.em);
      }catch{Error} 
      message.channel.stopTyping();
  }
  else if(message.content.startsWith(prfx) && message.content.length <= 2){
    message.reply("<:joo:1039729807933579274>");
  }

/* ----------------------- Open Ai API GPT4 --------------------------------------------------------------- */
  if((message.content.startsWith(prfx) && msgfinal.startsWith("gpt4")) && message.content.length > 2){
    const shit = msgfinal.replace(/gpt4/i,'').trim();
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
  if((message.content.startsWith(prfx) && msgfinal.startsWith("hash")) && !message.author.bot){
    const parsed = msgfinal.replace(/hash/i,"").trim();
    const hssplit = parsed.split(" ");
    try{
      const hash_ = crypto.createHash(`${hssplit[0]}`)
      hash_.update(`${hssplit[1]}`)
      await message.reply(`hash of ${hssplit[1]} in ${hssplit[0]} is [${hash_.digest("hex")}]`);
  }catch{Error};
  }

/* -------------------------- Weather ----------------------------------- */
  if((viesti[0] == ".w" && !message.author.bot) || (message.content.startsWith(".") && msgfinal.includes("weather"))){
  try{
    const w_api = new weatherapi();
    await w_api.w_current(choice);
    await message.reply(w_api.res)
    }catch{Error}
  }
  else if((viesti[0] == ".f" && !message.author.bot) || (message.content.startsWith(".") && msgfinal.includes("forecast"))){
    try{
    const w_api = new weatherapi();
    await w_api.w_fech(choice);
    await message.reply(w_api.emb);
  }catch{Error}
}
});
