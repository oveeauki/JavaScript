/**
@author 0xFreDi
@description HienoSääBotti Main
@todo add chunk splitter as 2nd optional condition 
bc of message max length in discord api
                                                **/
import * as Discord from "discord.js"
import cf from "../Config/config.json" assert {type:"json"}
import {stdin,stdout,exit} from "process"
import {GPT_API,claudeapi,wapi,pubmed} from "../Modules/apis.js" 
import {hashopt,help} from "../Modules/help.js"
import crypto from "node:crypto" 

const client = new Discord.Client();

var prfx = "!";

client.login(cf.token);

class timer{
  constructor(){
    this.dallecount = 0;
}
  get_time(){
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
  this.timer = setInterval(() => {
    const res = this.get_time();
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
  const msgfinal = message.content.replace(/[!.]/i,"")
                                  .trim()
                                  .toLowerCase();
  const opts = ["gpt4","dalle","hash","claude"]
  let viesti = message.content.split(" ")
  const myid = "300648311067508754";
  const w_param = msgfinal.replace(/^(w\s+|weather\s*)/i,'').trim();
 /*----------------------------------------------------------------------------------------*/

// Help For Channel
if((message.content.startsWith(".") && msgfinal.startsWith("help")) && !message.author.bot){
  const embd = help();
  await message.reply(embd);
}
else if(message.channel.type == "dm" && !message.author.bot){
  const embd = help();
  await message.reply(embd);
}

/*--------------------------------PubChem API----------------------------------------------*/
  if((message.content.startsWith(".") && msgfinal.includes("pstr")) && !message.author.bot){
   try{
    const shit = msgfinal.replace(/pstr/i,'').trim();
    const pb = new pubmed(shit);
    await pb.pubmedimage()
    const att = new Discord.MessageAttachment(pb.ju,"image.png")
    await message.reply({
      files:[att] 
  })
}catch{Error}
}

/*--------------------------------Message Channel BulkDelete----------------------------------------*/
  if((message.content.startsWith(".") && msgfinal.includes("delete")) && message.author.id == myid){
    try{
      const parsed = message.content.match(/\d+/);
      const int = parseInt(parsed);
      await message.channel.bulkDelete(int+1);
      await message.channel.send(`Removed [${int}] Messages`).then(msg => msg.delete({timeout:10000}));
  }catch{Error}
  }
  else if(message.content.startsWith(".") && msgfinal.includes("delete") && message.author.id !== myid){
    await message.reply("<:bro:968649274281840640>")
  }
/* ----------------------- Open Ai API DALL-E --------------------------------------------------------------- */
  if((message.content.startsWith(prfx) && msgfinal.startsWith("dalle")) && _timer.dallecount <= 2){
    _timer.dallecount++;
    const shit = msgfinal.replace(/dalle/i,'').trim();
    let api = new GPT_API(shit);
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
    let aiclaude = new claudeapi(shit)
    message.channel.startTyping();
    try{
      await aiclaude.claudefetch();
      await message.reply(aiclaude.me);
      }catch{Error} 
      message.channel.stopTyping();
  }
/* ----------------------- Open Ai API GPT3 --------------------------------------------------------------- */
  if((message.content.startsWith(prfx) && !opts.some(opt => msgfinal.startsWith(opt))) && message.content.length > 2){
    message.channel.startTyping();
    try{
      let api = new GPT_API(msgfinal);
      await api.apifetch();
      await message.reply(api.em);
      }catch{Error} 
      message.channel.stopTyping();
  }
  else if((message.content.startsWith(prfx) && !message.author.bot) && message.content.length <= 1){
    await message.reply("<:joo:1039729807933579274>");
  }

/* ----------------------- Open Ai API GPT4 --------------------------------------------------------------- */
  if((message.content.startsWith(prfx) && msgfinal.startsWith("gpt4")) && !message.author.bot){
    const shit = msgfinal.replace(/gpt4/i,'').trim();
    message.channel.startTyping();
    try{
      let api = new GPT_API(shit);
      await api.apigpt4();
      await message.reply(api.me);
      }catch{Error} 
      message.channel.stopTyping();
  }
/* -------------------------- Hashing ----------------------------------- */
  if((message.content.startsWith(prfx) && msgfinal.startsWith("hash")) && !message.author.bot){
    const parsed = msgfinal.replace(/hash/i,"").trim();
    switch(parsed){
      case "help":
        let res = await hashopt();
        await message.reply(res);
        break;
      }
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
      const wa = new wapi();
      await wa.w_current(w_param);
      await message.reply(wa.res)
    }catch{Error}
  }
  else if((viesti[0] == ".f" && !message.author.bot) || (message.content.startsWith(".") && msgfinal.includes("forecast"))){
    try{
      const wa = new wapi();
      await wa.w_fech(w_param);
      await message.reply(wa.emb);
  }catch{Error}
}
});
