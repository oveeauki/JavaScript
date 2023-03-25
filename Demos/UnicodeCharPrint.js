/**
@auth oveeauki
@desc Prints out unicode chars from defined range
      example: print(0x000A,0x000F);                            
                                                  */
import {stdout,stdin,exit} from "process"
import fs from "fs"
import rl from "readline";

const r = rl.createInterface({
input:stdin,
output:stdout
});

class functions{
  addbegin(){
    r.question("Add Beginning HexDec range\n\u279c ",(i) => {
        this.begin = i;
        this.addend();
    });
  }
  addend(){
    r.question("Add end HexDec range\n\u279c ",(i) => {
        this.end = i;
        print(this.begin,this.end);
     });
  }
}

let print = async(beg,end) => {
var arr = [];
  for(let i=beg;i<end;i++){
    const char = String.fromCharCode(i);
      arr.push(char);
}
        const js = JSON.stringify(arr)
          const file = fs.appendFileSync("symbols.json",js);
            console.log("File Written!");
              setTimeout(() => {exit(0)},4000);
}

let main = async( ) => {
const file = "symbols.json";
  if(fs.existsSync(file)){
      fs.unlinkSync(file);
}
        const funcs = new functions();
          funcs.addbegin();
            return(0);
}

main();
