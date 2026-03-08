/**
@desc User Help
                */
import {MessageEmbed} from "discord.js"
import {exec} from "child_process"

const helpmsg = "\
\nCommands use prefix (!) for Ai stuff and (.) for all other stuff\
\ngpt3 (GPT-3.5)\
\ngpt4 (Picks automatically model based of input)\
\ncld (Claude 4.0+)\
\nucode input in hexrange format eg.(0xXXX - 0xXXX)\
\npstr (chemical) 2D MolView\
\npwiki (substance) PsychonautWiki\n";

const helpmsg1 = "\
\nxor (Key in Hex form (0x..) (input)\
\nbitshifting (shift (Hex >> int) or (shift (Hex << int))\
\nAND mask e.g(int & anotherint)\
\ndalle (inp) (dalle image model)\
\nhash (algo) (input)\
\nw (location) current weather\
\nf (location) forecast\n"

export function help(){
  let embd = new MessageEmbed()
  .addField(helpmsg," ")
  .addField(helpmsg1," ");
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
