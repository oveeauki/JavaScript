/**
@author 0xFreDi
@description Create a function that repeats each character in a string n times.  
                                                                                */
const {argv,exit} = require("process");

let repeat = (string,amount) => {
let array = [];
if(amount <= 0){
  console.log("Enter Int Greater Than 0...");
  exit(1);
}
else {
for(var i=0;i<string.length;i++){
  for(var k=1;k<=amount;k++){
    array += (string[i]);
}
}
console.log("Start String [%s]\nChars Duplicated by [%d]\nResult [%s] ",string,amount,array);
exit(0);
}
}

repeat(argv[2],argv[3]);
