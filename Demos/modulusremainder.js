/**
  *@auth 0xFreDi
  *@Desc Return remainder of 2 values
                                      */
const {stdout,stdin,exit} = require("process");
const rl = require("readline").createInterface({
input:stdin,
output:stdout  
});

let remain = (array = []) => {
const remainder = (array[0]%array[1]);
return(remainder);
}

let _init = async() => {
let numbers = [];
  for(let i=0;i<2;i++){
    await new Promise((res) => {
      rl.question(`Enter number ${(i+1)}\n\u279C `,(int) => {
      numbers[i] = int;
      res();
});
});
}
console.log("Remainder of [%d] & [%d] is: [%d]",numbers[0],numbers[1],remain(numbers));
exit(0);
}

_init();
