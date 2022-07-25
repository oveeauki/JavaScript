/*
    Return remainder of 2 int's
                                 */
const {stdout,stdin,exit} = require("process");
const rl = require("readline").createInterface({
input:stdin,
output:stdout  
});

let solve = (array = []) => {
const remainder = (array[0]%array[1]);
stdout.write(`Remainder of numbers : [${array[0]}] & [${array[1]}] = ${remainder}\n`);
exit(0);
};

let _init = async() => {
let numbers = [];
for(let i=0;i<2;i++){
await new Promise((resolve) => {
rl.question(`Enter number ${(i+1)}\n\u279C `,(int) => {
numbers[i] = int;
resolve();
});
});
}
solve(numbers);
};

_init();
