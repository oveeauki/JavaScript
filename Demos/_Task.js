/**
@author 0xFreDi
@description Enter objects into 
array and modify then in realtime                
                                    */
const {stdout,stdin,exit, mainModule} = require("process");
const r = require("readline").createInterface({
input:stdin,
output:stdout
});

class solve {
constructor(amount){
this.amnt = amount;
this.array = [];
}
add = async() => {
for(let i=0;i<this.amnt;i++){
   await new Promise((res) => {
   console.log("Array %s ",this.array);
   r.question(`Enter Object (${i+1})\n\u279C `, (inp) => {
      this.array.push(inp);
      console.clear();
      res();
});
});
}
_main(this.array);
}

position = (array = []) => {
if(array.length <= 0){
   console.log("Insert Objects into array first...\nArray Size [%d]",array.length);
   exit(1);
}
console.log("Array %s",array)
var count = 0;
let selected = [];   
r.question("Enter object to get position\n\u279C ",(i_) => {
   for(let i=0;i<array.length;i++){
   count++;
   if(i_ == array[i]){
   selected.push(array[i]);
   }
}  
console.log("Objects found %s\nPosition [%d]",selected,count);
setTimeout(() => {
   _main(array);
},4000);
});
}

popp = async(array = []) => {
if(array.length == 0){
   console.log("Insert Objects into array first...\nArray Size [%d]",array.length);
   exit(1);
}
else{
for(let i=array.length-1;i>=0;i--){
   await new Promise((res) => {
   console.log("Array %s ",array);
   array.pop(i);
   setTimeout(() => {
   res();
   },2000);
   });
   }
}
_main(array);
}
};

let amount = ( ) => {
r.question("Enter Amount of objects to enter\n\u279C ",(in_) => {
   const _solve = new solve(in_);
   console.clear();
   _solve.add();
   return(in_);
});
}

let _main = async(array = []) => {
console.clear();
const _solve = new solve();
console.log("Array %s",array);
while(true){
   await new Promise((res) => {
   r.question("(1)Add\n(2)Find\n(3)Pop\n(4)Exit\n\u279C ",(inp) => {
      switch(inp){
         case "1":
            amount();
            break;
         case "2":
            console.clear();
            _solve.position(array);
            break;
         case "3":
            _solve.popp(array);
            break;
         case "4":
            exit(0);
         }
res();
});
});
}
}

_main();