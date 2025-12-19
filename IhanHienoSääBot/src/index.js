/**
@author 0xFreDi
@description HienoSääBotti Main
@todo - add chunk splitter as 2nd optional condition 
      bc of message max length in discord api.
      - LOOK IN max message embed len
                                                      **/
import * as Discord from "discord.js"
import cf from "../Config/config.json" assert {type:"json"}
import crypto from "node:crypto" 
import {stdout} from "process"
import {API_Obj} from "../Modules/apis.js"
import {algos} from "../Modules/Randalgos.js"
import {hashopt,help} from "../Modules/help.js"

const client = new Discord.Client();
const api = new API_Obj();
const algs = new algos();

var pfx1 = "!", pfx2 = "."

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
  stdout.write(`\
\n Botti Status [Ready]\
\n Botti ID [${client.user.id}]\
\n Botti is in [${client.guilds.cache.size}] Servers\
\n Botti Nick [${client.user.username}]\
\n/********************************************/\n`);
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
  const msgfinal = message.content.replace(/^[!.]/i,"")
                                  .trim()
                                  .toLowerCase();
  const myid = "300648311067508754";
  const w_param = msgfinal.replace(/^(w\s+|weather\s*)/i,'').trim();
  const hexparser = /^0x[0-9a-fA-F]+$/;
  const spltfinal = msgfinal.split(" ");
 /*----------------------------------------------------------------------------------------*/

  if(message.content.startsWith(pfx1) && !message.author.bot){
    switch(spltfinal[0]){
      case "gpt3":
        const s = msgfinal.replace(/gpt3/i,'').trim();
         message.channel.startTyping();
        try{
          await api.gpt3(s);
          await message.reply(api.gpt3ans);
       }catch{Error} 
          message.channel.stopTyping();
          break;
      case "gpt4":
         const shit = msgfinal.replace(/gpt4/i,'').trim();
         message.channel.startTyping();
        try{
          await api.gpt4(shit);
          await message.reply(api.gpt4ans);
       }catch{Error} 
          message.channel.stopTyping();
          break;
          case "dalle":
        try{
          if(_timer.dallecount <= 2 && !message.author.bot){
          _timer.dallecount++;
          const da = msgfinal.replace(/dalle/i,'').trim();
          message.channel.startTyping();
              await api.dall_e(da);
              await message.reply({
              files:[{
                attachment:api.dalle_l,
                name:"image.png"
            }] 
        });
          }
        else if(_timer.dallecount > 2 && !message.author.bot){
            const msg = `Max 3 Image limit. [${(60-_timer.mins)}] Mins left for reset...`;
            await message.reply(msg).then(msg => msg.delete({timeout:10000}))
          }
        }catch{Error} 
        message.channel.stopTyping();
        break;

    case "cld":
      const cl = msgfinal.replace(/cld/i,'');
      message.channel.startTyping();
      try{
        await api.claudefetch(cl);
        await message.reply(api.cldans);
      }catch{Error} 
      message.channel.stopTyping();
      break;
      }
  }

  else if(message.content.startsWith(pfx2) && !message.author.bot){
    switch(spltfinal[0]){
      case "btshift":
        const in_ = msgfinal.replace(/btshift/gi,"").trim().split(" ");
        const res = await algs.bitshift(in_);
        await message.reply(res);
      break;

      case "ucode":
        try{
          const in_ = msgfinal.replace(/^ucode/i,"").trim().split(" ");
          const res = await algs.ucharprint(in_,hexparser);
         // LOOK IN max message embed len const ea = new Discord.MessageEmbed(res);
          await message.reply(res);
      }catch{Error}
      break;

  case "pwiki":
    try{
      const in_ = msgfinal.replace(/^pwiki/i,"").trim();
      const wikie = await api.embedwiki(in_);
      const msgbox = `\`\`\`\n${wikie}\n\`\`\``;
      await message.reply(msgbox);
    }catch{Error}
    break;
  
  case "help":
    const embd = help();
    if(message.channel.type == "dm" && !message.author.bot)
        await message.reply(embd);
    else 
      await message.reply(embd);

      break;

  case "crc32":
    try{
        message.channel.startTyping();
        const [a,b,c] = msgfinal.replace(/crc32/i,'').trim().split(" ");
        var ms = await algs.crc32(a,b,c);
        const msgbox = `\`\`\`\n${ms}...\n\`\`\``;
        await message.reply(msgbox);
        message.channel.stopTyping();
      }catch{Error}
      break;

  case "xor":
    try{
      const [str,key] = msgfinal.replace(/xor/i,'').trim().split(" ");
      if(hexparser.test(key)){
        var ms = await algs.XOR(str,key);
        const msgbox = `\`\`\`Key:[${key.toUpperCase()}]\

                            \n${ms}\`\`\``
        await message.reply(msgbox);
      }
      else{
        await message.reply(`Error. Use Keys in Hex Range and Form (0x.....)`).then(msg => msg.delete({timeout:10000}));
      }
    }catch{Error}
    break;

  case "pstr":
    try{
      const shit = msgfinal.replace(/pstr/i,'').trim();
      await api.pubmedimage(shit);
      const att = new Discord.MessageAttachment(api.pbimg,"image.png")
      await message.reply({
        files:[att]
      })
    }catch{Error}
    break;

  case "delete":
    try{
      if(message.author.id == myid){
        const parsed = message.content.match(/\d+/);
        const int = parseInt(parsed);
        await message.channel.bulkDelete(int+1);
        await message.channel.send(`Removed [${int}] Messages`).then(msg => msg.delete({timeout:5000}));
      }
    else
        await message.reply("<:bro:968649274281840640>");
        }catch{Error}
      break;

  case "hash":
    const parsed = msgfinal.replace(/hash/i,"").trim();
    const hssplit = parsed.split(" ");
    try{
    if(parsed == "help"){
        let res = await hashopt();
        await message.reply(res);
      }
      const hash_ = crypto.createHash(`${hssplit[0]}`)
      hash_.update(`${hssplit[1]}`)
      await message.reply(`hash of ${hssplit[1]} in ${hssplit[0]} is [${hash_.digest("hex")}]`);
    }catch{Error};
  break;  

  case "w":
     try{
      await api.w_current(w_param);
      await message.reply(api.wapires)
    }catch{Error}
    break;

  case "f":
    try{
      await api.w_fech(w_param);
      await message.reply(api.emb);
    }catch{Error}
  break;
}
  }
});
