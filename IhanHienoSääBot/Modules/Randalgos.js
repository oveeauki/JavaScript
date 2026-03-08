/** 
@desc

          */ 
import {exec} from "child_process";
import {retpath} from "../../Global_Modules/ESMfilepath.js"

const pth = await retpath(import.meta.url);

export class bytestuff{
  async bitshift(input = []){ // Left & Right Side Bitshifting Methods
    return new Promise((r) => {
      const hex=Number.parseInt(input[0]),hexstr=hex.toString(16).toUpperCase(),intt=Number.parseInt(input[2])
      if (isNaN(hex) || isNaN(intt)) r("Invalid numbers");
      input.map(dat => {
        if(/>>/g.test(dat)){
          var fin = hex >> intt,fin2=Number.parseInt(fin);
          r(`Right Shift of:(0x${hexstr}(Dec:${hex})) With Int:(${intt})\n\t\t\t\t\  Equals Hex:(0x${fin2.toString(16).toUpperCase()}(Dec:(${fin})))`);
          hex = null,hexstr=null,intt=null;

        }
        else if(/<</g.test(dat)){
          var fin = hex << intt,fin2=Number.parseInt(fin);
          r(`Left Shift of:(0x${hexstr}(Dec:${hex})) With Int:(${intt})\n\t\t\t\t\   Equals Hex:(0x${fin2.toString(16).toUpperCase()}(Dec:(${fin})))`);
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

  async and_or_not(input = []){
    return new Promise((res) => {
      var val = Number.parseInt(input[0]),val2 = Number.parseInt(input[2]);
      switch(input[1]){
        case "&": // AND
          const and = val & val2;
          res(`AND Mask of:(0x${val.toString(16).toUpperCase()}(Dec:${val})) With (0x${val2.toString(16).toUpperCase()}(Dec:${val2})\n\t\t\t\t\   Equals Hex:(0x${and.toString(16).toUpperCase()}(Dec:(${and})))`);
          break; 
        case "|": // OR
          break;
        case "~": // NOT
          break;
        }
    })
  }

  async swap_endian(num){
    num = num >>> 0;
    var a = (((num >> 24) & 0xFF)|((num >> 8) & 0xFF00)| ((num << 8) & 0xFF0000)|((num << 24) & 0xFF000000))
    a = a >>> 0;
    return(a);
  }
}

export class algos{
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
    var chrs = 0;
    chars.forEach(char => {chrs++})
    const remaining = unicode.slice(900).length;
    const result = `Chars Over Msg limit:(${remaining})\`\`\`\ ${chars.trim()}\n\`\`\``
    res(result);
})
  }

}
