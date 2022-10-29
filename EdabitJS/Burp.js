/**
@auth oveeauki
@desc Repeat "R" (N) Times                                  
                            */
const {stdin,stdout,argv,exit} = require("process");
const r = require("readline").createInterface({
input:stdin,
output:stdout
});

let burrp = async(amount) => {
var r = "";
console.log("R times [%d]",amount);
for(let i=0;i<amount;i++){
  await new Promise(res => {
    setTimeout(() => {
      r += 'r';
      console.log(`Bu${r}p`);
      res();
      },2000);
});
}
  exit(0);
}

burrp(argv[2]);
