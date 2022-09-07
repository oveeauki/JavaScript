/**
@auth oveeauki
@desc Create a function that takes in an array (slot machine outcome)
and returns true if all elements in the array are identical, 
and false otherwise. The array will contain 4 elements.
                                                                */
const {stdout,stdin,exit} = require("process");
const r = require("readline").createInterface({
input:stdin,
output:stdout,
});

class checkpot {
constructor(array = []){
this.array = array;
this.rs = array.every(d => d == array[0]);
}
get checkjack(){
if(!this.rs)
   return(`No Jackpot! xd [${this.array}]`);
else
   return(`Jackpot! xd [${this.array}]`);
}
};

let main = async( ) => {
let objarr = [];
stdout.write("Enter (4) Objects...\n");
for(let i=0;i<4;i++){
   await new Promise((res) => {
   r.question(`Enter obj (${i+1})\n\u279C `,(dat) => {
   objarr.push(dat);
   res();
});
});
}
stdout.write(`Entered : [${objarr}]\n`);
const _checkpot = new checkpot(objarr);
console.log(_checkpot.checkjack);
exit(0);
}; 

main();