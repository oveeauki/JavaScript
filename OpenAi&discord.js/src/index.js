/**
@author oveeauki
@description IhanHienoSääBotti V2 (not final)
                                   	         **/
import {OpenAIApi,Configuration} from "openai";
import * as Discord from "discord.js";
import cf from "../Config/config.json" assert {type:"json"};
import {stdin,stdout,exit} from "process"
const openaiconf = new Configuration({apiKey:"<Your Key>"});
const op = new OpenAIApi(openaiconf);
const client = new Discord.Client();

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
max_tokens: 1500
}).then(respp => {
this.anws = JSON.stringify(respp.data.choices[0].text).replace(/\\n/g,'');
this.me = `\`\`\`\n${this.anws}\n\`\`\``;
});
}
}

client.once("ready",async() => {
console.clear();
stdout.write(
`Botti Status [Ready]
Botti ID [${client.user.id}]
Botti is in [${client.guilds.cache.size}] Servers
Botti Nick [${client.user.username}]
/********************************************/\n`);
await client.user.setActivity("Sää");      
await client.user.setPresence({status:"dnd"});
});

client.on("message",async(message) => {
const msgfinal = message.content.replace(/([!])/,"");
let viesti = msgfinal.split(" ");
const myid = "300648311067508754";
/*--------------------------------Message Channel BulkDelete----------------------------------------*/
if(viesti[0] == "." && viesti[1] == "delete" && message.author.id == myid){
  const parsed = message.content.match(/\d+/);
  const int = parseInt(parsed);
  message.channel.bulkDelete(int+1);
  message.channel.send(`I deleted [${int}] amount of messages`).then(msg => msg.delete({timeout:10000}));
}
/*---------------------------------------------------------------------------------------------------*/

/* ----------------------- Open Ai API --------------------------------------------------------------- */
if(message.content.startsWith(prfx) && !message.author.bot){
  message.channel.startTyping();
  try{
    console.log(msgfinal);
    let api = new AIAPI(msgfinal);
    await api.apifetch();
    await message.reply(api.me);
    }catch{Error} 
    message.channel.stopTyping();
}
});
