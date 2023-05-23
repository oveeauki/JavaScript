/**
@auth 0xFreDi
@desc Write a for loop that takes an array of numbers 
and prints the sum of all the even numbers in the array to the console.
                                                                        */
import {stdin,stdout,exit} from "process"
import rl from "readline"

const r = rl.createInterface({
input:stdin,
output:stdout
});

class inputs {
  constructor(){
    this.amnt = 0;
    this.numbers = [];
}
amount = () => {
  r.question("Enter Amount of Numbers to Enter\n\u279c ",(i) => {
    this.amnt = i;
    this.arrinp();
});
}
arrinp = async() => {
  for(var i=0;i<this.amnt;i++){
    await new Promise((res) => {
      r.question(`Enter Number (${i+1})\n\u279c `,(i) => {
        this.numbers.push(i);
        res();
});
});
}
getevennumbers(this.numbers);
}
}

const getevennumbers = async(arr = []) => {
let evennumbeers = [];
  for(var i=arr.length-1;i>=0;i--){
    await new Promise((res) => {
      if(arr[i] % 2 == 0){
        evennumbeers.push(arr[i]);
    }
    res();
});
}
console.log("\nEven Numbers from input are %s",evennumbeers);
exit(0);
}

const main = async() => {
  let _inp = new inputs();
    _inp.amount();
}

main();
