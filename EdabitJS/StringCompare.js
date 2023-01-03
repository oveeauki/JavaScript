/**
*@auth oveeauki
*@desc Is String the same backwards and forwards ?                            
                                                  */ 
import * as rl from "readline";
import {stdout,stdin,exit} from "process";
const r = rl.createInterface({
input:stdin,
output:stdout
});

let compare = (start,rev) => {
if(start == rev){
  console.log("String [%s] is same backwards also [%s]",start,rev);
}
else{
  console.log("String [%s] is not same backwards [%s]",start,rev);
}
exit(0);
}

let main = async( ) => {
  r.question("Enter String\n\u279c ",(startstring) => {
    let endstring = "";
      for(let i=startstring.length-1;i>=0;i--){
        endstring += startstring[i];
    }
        compare(startstring,endstring);
    });
        return(0);
}

main();
