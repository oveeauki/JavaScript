/**   
@auth oveeauki
@desc Array.pop() Sample
                        */
const {stdout,stdin,exit} = require("process");
const rl = require("readline").createInterface({
input:stdin,
output:stdout
});

let finish = (array = []) => {
const arraysize = array.length;
stdout.write(`\n\nArray is complete empty(${arraysize}) ${array} \n`);
setTimeout(() => {
exit(0);
},3000);
};

var emptyarray = async(array = []) => {
console.clear();
stdout.write("Array Includes : ");
for(var a in array){
stdout.write(`${array[a]} `);
}
for(let i=array.length;i>=1;i--){
await new Promise((res) => {
setTimeout(() => {
try{
array.pop(i);
res();
}catch{Error}
stdout.write(`\n\nRemoving array obj [${(i)}]\nNow the Array includes [${array}] `)
},1500);
});
}
finish(array);
};

let fillarray = async(amount) => {
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
emptyarray(arraunum)
}catch{Error};
return(0);
};

let _Main = () => {
rl.question(`Amount of numbers to enter in Array?\n\u279C `,(amount) => {
fillarray(amount);
});
};

_Main();
