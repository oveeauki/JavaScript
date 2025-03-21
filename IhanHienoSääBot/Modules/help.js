/**
@desc User Help
                */
import Discord from "discord.js"
import {exec} from "child_process"

const helpmsg = "\
\n  Commands use prefix (!) for everything except weather commands (.)\
\n  (input) GPT 3.5\
\n  gpt4 (GPT-4o)\
\n  cld (Claude 3.8+)\
\n  dalle (dalle image model)\
\n  hash (algo) (input)\
\n .w (location) current weather\
\n .f (location) weather forecast for 2 days\n"

export function help(){
  let embd = new Discord.MessageEmbed()
  .addField(helpmsg," ");
  return(embd);
}

export async function hashopt(){
  return new Promise((res) => {
    exec("'openssl' list -digest-algorithms",(er,stdout,stderr) => {
      if(!(er) || !(stderr)){
        const tr = stdout.split("Provided:")[0]?.replace(/Legacy:/i,"").trim();
        const msgbox = `These Are The Available Hashing Algos\`\`\`\n${tr}\n\`\`\``;
        res(msgbox)
    }
      else{
        res(stderr); 
      }
    })
})
}
