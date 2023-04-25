/**
@auth 0xFreDi
@desc BrokenBridge                     
                    */
import {stdin,stdout,exit,argv} from "process"
import fs from "fs"
import path from 'path'
import rl from "readline"

const r = rl.createInterface({
input:stdin,
output:stdout
});

const main = async() => {
var boolean = Boolean(false);
  r.question("Enter Bridge In Form Of Chars\n\u279c ",(i) => {
    const _srch = i.search(/\s/g);
    if(_srch != -1){
      console.log("Bridge Broken at position [%s]",(_srch+1));
      boolean = false;
      }
    else{
      boolean = true;
      console.log("Bridge Intact!");
    }
});
}

main();
