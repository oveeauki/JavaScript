/**
@auth 0xFreDi
@desc Write a for loop that generates a random number between 1 and 10 (inclusive) 
in each iteration and prints it to the console. 
The loop should stop when a generated number is greater than 8.
                                                                */
import {stdin,stdout,exit,argv} from "process"
import rl from "readline"

const r = rl.createInterface({
input:stdin,
output:stdout
});

class rng {
  gen = async() => {
    for(;;){
      console.clear();
        await new Promise((res) => {
          var random = Math.floor(Math.random()*11);
          console.log("[%d]",random);
          if(random > 8){
            exit(0);
          }
            setTimeout(() => {
              res();
             },2000);
      });
  }
}
}

const main = async() => {
  const _rng = new rng();
  _rng.gen();
}

main();
