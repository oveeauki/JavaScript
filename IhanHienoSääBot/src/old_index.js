/**
@author 0xFreDi
@description HienoSääBotti old&obsolete index remaining just as backup
                                                                      **/
import * as Discord from "discord.js"
import cf from "../Config/config.json" assert {type:"json"}
import crypto from "node:crypto" 
import {stdout} from "process"
import {API_Obj} from "../Modules/apis.js"
import {crc32,XOR} from "../Modules/Randalgos.js"
import {hashopt,help} from "../Modules/help.js"

const client = new Discord.Client();

var pfx1 = "!"
var pfx2 = "."

client.login(cf.discord_t);

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
  await client.user.setActivity(".help for commands");      
  await client.user.setPresence({status:"dnd"});
});

client.on("message",async(message) => {
  const api = new API_Obj();
  const msgfinal = message.content.replace(/^[!.]/i,"")
                                  .trim()
                                  .toLowerCase();
  const opts = ["gpt4","dalle","cld"]
  let viesti = message.content.toLowerCase().split(" ");
  const myid = "300648311067508754";
  const w_param = msgfinal.replace(/^(w\s+|weather\s*)/i,'').trim();
  const hexparser = /^0x[0-9a-fA-F]+$/;
 /*----------------------------------------------------------------------------------------*/

  if((message.content.startsWith(pfx2) && msgfinal.includes("pwiki")) && !message.author.bot){
    try{
      const in_ = msgfinal.replace(/^pwiki/i,"").trim();
      const wikie = await api.embedwiki(in_);
      await message.reply(wikie);
    }catch{Error}
  }

  if(message.content.startsWith(pfx2) && (msgfinal.includes("ban") && message.author.id == myid)){
    try{
      const reason_ = message.content.split(' ').slice(2).join(' ') || 'No reason provided';
      const userToBan = message.mentions.users.first();
      const memberToBan = message.guild.member(userToBan);
      await memberToBan.ban({reason:reason_});
      await message.reply(`Banned ${memberToBan.user.username} <:xIc:1090089641392214026> With a Reason "${reason_}" <:xIc:1090089641392214026> `)
    }catch{Error};
  }
  // Help For Channel
  if((message.content.startsWith(pfx2) && msgfinal.startsWith("help")) && !message.author.bot){
    try{
      const embd = help();
      await message.reply(embd);
    }catch{Error}
  }
  else if(message.channel.type == "dm" && !message.author.bot){
    try{
      const embd = help();
      await message.reply(embd);
    }catch{Error}
  }

  if((message.content.startsWith(pfx2) && msgfinal.includes("crc32")) && !message.author.bot){
    try{
      message.channel.startTyping();
      const [a,b,c] = msgfinal.replace(/crc32/i,'').trim().split(" ");
      var ms = await crc32(a,b,c);
      const msgbox = `\`\`\`\n${ms}...\n\`\`\``;
      await message.reply(msgbox);
      message.channel.stopTyping();
    }catch{Error}
  }

  if((message.content.startsWith(pfx2) && msgfinal.includes("xor")) && !message.author.bot){
    try{
      const [str,key] = msgfinal.replace(/xor/i,'').trim().split(" ");
      if(hexparser.test(key)){
        var ms = await XOR(str,key);
        const msgbox = `\`\`\`Key:[${key.toUpperCase()}]\

                            \n${ms}\`\`\``
        await message.reply(msgbox);
      }
      else{
        await message.reply(`Error. Use Keys in Hex Range and Form (0x.....)`).then(msg => msg.delete({timeout:10000}));
      }
    }catch{Error}
  }

/*--------------------------------PubChem API----------------------------------------------*/
  if((message.content.startsWith(pfx2) && msgfinal.includes("pstr")) && !message.author.bot){
    try{
      const shit = msgfinal.replace(/pstr/i,'').trim();
      await api.pubmedimage(shit);
      const att = new Discord.MessageAttachment(api.pbimg,"image.png")
      await message.reply({
        files:[att] 
      })
    }catch{Error}
}

/*--------------------------------Message Channel BulkDelete----------------------------------------*/
  if((message.content.startsWith(pfx2) && msgfinal.includes("delete")) && message.author.id == myid){
    try{
      const parsed = message.content.match(/\d+/);
      const int = parseInt(parsed);
      await message.channel.bulkDelete(int+1);
      await message.channel.send(`Removed [${int}] Messages`).then(msg => msg.delete({timeout:5000}));
    }catch{Error}
  }
  else if(message.content.startsWith(".") && msgfinal.includes("delete") && message.author.id !== myid){
    await message.reply("<:bro:968649274281840640>")
  }

/*--------------------Claude Ai-------------------------------------------------------------*/
  if((message.content.startsWith(pfx1) && msgfinal.startsWith("cld")) && message.content.length > 2){
    const shit = msgfinal.replace(/cld/i,'');
    message.channel.startTyping();
    try{
      await api.claudefetch(shit);
      await message.reply(api.cldans);
    }catch{Error} 
    message.channel.stopTyping();
  }

/* ----------------------- Open Ai API DALL-E --------------------------------------------------------------- */
  if((message.content.startsWith(pfx1) && msgfinal.startsWith("dalle")) && _timer.dallecount <= 2){
    _timer.dallecount++;
    const shit = msgfinal.replace(/dalle/i,'').trim();
    message.channel.startTyping();
    try{
      await api.dall_e(shit);
      await message.reply({
        files:[{
          attachment:api.dalle_l,
          name:"image.png"
        }] 
    });
      }catch{Error} 
    message.channel.stopTyping();
  }
  else if((message.content.startsWith(pfx1) && msgfinal.startsWith("dalle")) && (_timer.dallecount > 2 && !message.author.bot)){
    const msg = `Max 3 Image limit. [${(60-_timer.mins)}] Mins left for reset...`;
    await message.reply(msg).then(msg => msg.delete({timeout:10000}))
  }

/* ----------------------- Open Ai API GPT3 --------------------------------------------------------------- */
  if((message.content.startsWith(pfx1) && !opts.some(opt => msgfinal.startsWith(opt))) && message.content.length > 2){
    message.channel.startTyping();
      try{
        await api.gpt3(msgfinal);
        await message.reply(api.gpt3ans);
      }catch{Error} 
      message.channel.stopTyping();
  }
  else if((message.content.startsWith(pfx1) && !message.author.bot) && message.content.length <= 1){
    await message.reply("<:joo:1039729807933579274>");
  }

/* ----------------------- Open Ai API GPT4 --------------------------------------------------------------- */
  if((message.content.startsWith(pfx1) && msgfinal.startsWith("gpt4")) && !message.author.bot){
    const shit = msgfinal.replace(/gpt4/i,'').trim();
    message.channel.startTyping();
    try{
      await api.gpt4(shit);
      await message.reply(api.gpt4ans);
     }catch{Error} 
    message.channel.stopTyping();
  }
/* -------------------------- Hashing ----------------------------------- */
  if((message.content.startsWith(pfx2) && msgfinal.startsWith("hash")) && !message.author.bot){
    const parsed = msgfinal.replace(/hash/i,"").trim();
    const hssplit = parsed.split(" ");
    switch(parsed){
      case "help":
        let res = await hashopt();
        await message.reply(res);
        break;
      }
    try{
      const hash_ = crypto.createHash(`${hssplit[0]}`)
      hash_.update(`${hssplit[1]}`)
      await message.reply(`hash of ${hssplit[1]} in ${hssplit[0]} is [${hash_.digest("hex")}]`);
  }catch{Error};
  }

/* -------------------------- Weather ----------------------------------- */
  if((viesti[0] == ".w" && !message.author.bot)){
    try{
      await api.w_current(w_param);
      await message.reply(api.wapires)
    }catch{Error}
  }
  else if(viesti[0] == ".f" && !message.author.bot){
    try{
      await api.w_fech(w_param);
      await message.reply(api.emb);
  }catch{Error}
}
});
