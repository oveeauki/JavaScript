/* 
    Number Sorter(C++) Done in JS
                                    */
const {stdout,stdin,exit} = require("process");
const rl = require("readline").createInterface({
input:stdin,
output:stdout
});

class sort {
constructor(array = []){
this.array = array;
}
print(){
for(let a in this.array){
   stdout.write(`${this.array[a]} `);
}};
lowtohigh(){
this.array.sort();
stdout.write("Numbers Low to High : [ ");
this.print();
stdout.write("]\n")
this.hightolow();
}
hightolow(){
this.array.sort().reverse();
stdout.write(`Array Reversed : [ `);
this.print();
stdout.write("]\n")
}};

let numbers = async(amount) => {
let arr = [];
for(let i=0;i<amount;i++){
   await new Promise((resolve) => { 
   rl.question(`Enter Number ${(i+1)}\n\u27A6 `, int => {
   arr[i] = int;
   console.clear();
   resolve();
});
});}
let sorter = new sort(arr);
sorter.lowtohigh();
exit(0);
};

let _init = () => {
rl.question("Enter Amount Numbers to Sort\n\u27A6 ", amount => {
console.clear();
numbers(amount);
});
};

_init();