/** 
@author 0xFreDi
@description Random RegEx test
                               */
const {stdout,stdin,exit} = require("process");
const r = require("readline").createInterface({
input:stdin,
output:stdout
});

let main = async( ) => {
let bool = true;
var string = " "
while(bool){
await new Promise((res) => {
stdin.once("data",dat => {
string += dat;
console.clear();
if(/([0-9])/g.test(string) == 1){
console.clear();
console.log("no numbers....")
string = " ";
}
console.log("String : [%s ]\nSize of the string (%d) ",string,string.length-1);
switch(string.length){
case 35:
   bool = false;
   exit(0);
}
res();
});
});

}
};

main();
