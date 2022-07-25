/**   
@auth oveeauki
@desc Array.pop(); Sample
                        */
const {stdout,stdin,exit} = require("process");
const rl = require("readline").createInterface({
input:stdin,
output:stdout
});

class arraythings { 
constructor(arr = []){
this.arr = arr;
}

finish = (arr = []) => {
this.arraysize = this.arr.length;
stdout.write(`\n\nArray is complete empty(${this.arraysize}) ${arr}\n`);
setTimeout(() => {
exit(0);
},3000);
};

async emptyarray(array = []){
console.clear();
stdout.write("Array Includes : ");
for(var a in array){
stdout.write(`${array[a]} `);
}
for(let i=array.length-1;i>=0;i--){
await new Promise((res) => {
setTimeout(() => {
try{
console.log(`\n\nRemoving array obj #(${i}) | ${array[i]}\nNow the Array includes ${array} `);
array.pop(i);
res();
}catch{Error}
},1500);
});
}
this.finish(array);
}

async fillarray(amount){
console.clear();
let arraunum = [];
for(var i=0;i<amount;i++){
await new Promise((res) => {
rl.question(`Enter Number ${(i+1)}\n\u279C `,(dat) => {
arraunum[i] = dat;
res();
});
});
}
stdout.write("Numers: ");
for(let objs in arraunum){
stdout.write(`${arraunum[objs]} `) 
}
try{
this.emptyarray(arraunum)
}catch{Error};
return(0);
}};

let _Main = () => {
rl.question(`Amount of numbers to enter in Array?\n\u279C `,(amount) => {
let _init = new arraythings();
_init.fillarray(amount);
});
};

_Main();
