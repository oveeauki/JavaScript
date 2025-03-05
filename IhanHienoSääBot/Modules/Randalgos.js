/** 
@desc

          */ 
import {exec} from "child_process";
import {retpath} from "./ESMfilepath.js"

const pth = await retpath(import.meta.url);

export async function crc32(str,len,poly){
  return new Promise((res) => {
    exec(`'${pth}/crc32' ${str} ${len} ${poly}`,(er,stdout,stderr) => {
      if(!(er) && !(stderr)){
        res(stdout.slice(0,494).trim());
  }
    else{
      res(stderr.trim());
  }
    })
  })
}

export async function XOR(str,key){
  return new Promise((res) => {
    const b = Buffer.from(str)
    for(let i=0;i<b.length;i++){
      b[i] ^= key;
  }
      res(b.toString());
})
}