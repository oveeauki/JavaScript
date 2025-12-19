/** 
@desc

          */ 
import {exec} from "child_process";
import {retpath} from "../../Global_Modules/ESMfilepath.js"

const pth = await retpath(import.meta.url);

export class algos{
  async bitshift(input = []){ // Left & Right Side Bitshifting Methods
    return new Promise((r) => {
      const hex=Number.parseInt(input[0]),hexstr=hex.toString(16).toUpperCase(),intt=Number.parseInt(input[2])
      input.map(dat => {
        if(/>>/g.test(dat)){
          var fin = hex >> intt,fin2=Number.parseInt(fin);
          r(`Right Shift of:(0x${hexstr}) With Int:(${intt})\n\t\t\t\t Equals Decimal:(${fin}) & Hex:(0x${fin2.toString(16)})`);
        }
        else if(/<</g.test(dat)){
          const fin = hex << intt,fin2=Number.parseInt(fin);
          r(`Left Shift of:(0x${hexstr}) With Int:(${intt})\n\t\t\t\t Equals Decimal:(${fin}) & Hex:(0x${fin2.toString(16)})`);
        }
      })
    })
  }

   async crc32(str,len,poly){
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

 async XOR(str,key){
    return new Promise((res) => {
      const b = Buffer.from(str)
      for(let i=0;i<b.length;i++){
        b[i] ^= key;
    }
        res(b.toString());
    })
  }

async ucharprint(hex = [],parser){
  return new Promise((res) => {
  var unicode = [];

  for(let i=0;i<hex.length;i++){
    if(!parser.test(hex[i]) || hex[0] > hex[1])
      res("Enter Hex Range in Valid Format...");
  }

  for(let i=hex[0];i<hex[1];i++){
    const ax = String.fromCharCode(i);
    if(ax && ax.trim() !== '' && !/[\x00-\x1F\x7F]/.test(ax)){
      unicode.push(ax);  
    }
  }
    const chars = unicode.slice(0,900).join(' ');
    const remaining = unicode.slice(900).length;
    const result = `Chars Over Msg limit:(${remaining})\`\`\`\ ${chars.trim()}\n\`\`\``
    res(result);
})
  }

}
