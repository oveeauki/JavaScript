/**
@auth oveeauki
@desc Simple OOP Calculator (ARGV input)
Usage:[node file.js <obj1> <obj2> <function>]
Usable Functions are:[Divide,Multiply,Subtract,Add]                                        
                                                   */
const {argv,exit} = require("process");
const {c} = require("../Modules/colors");

class Calculator{
constructor(d1,d2){
this.d1 = parseInt(d1);
this.d2 = parseInt(d2);
}
get division(){
  let res = (this.d1/this.d2);
  return(`Returned ${res}`);
}
get multiply(){
  let res = (this.d1*this.d2);
  return(`Returned ${res}`);
}
get substract(){ 
  let res = (this.d1-this.d2);
  return(`Returned ${res}`);
}
get add(){
  let res = (this.d1+this.d2);
  return(`Returned ${res}`);
}
}

let prompt = (d1,d2) => {
  if(d1 <= 0 || d2 <= 0){
    console.log(`${c.red}Error!${c.reset}Enter Number Greater than 0... Argv[2]:[${d1}] Argv[3]:[${d2}]\n
      Usage:[node file.js <obj1> <obj2> <function>]
      Usable Functions are:[Divide,Multiply,Subtract,Add]`);
      exit(1);
}
}

let _main = () => {
  const Options = [`multiply`,`division`,`substract`,`add`];
      prompt(argv[2],argv[3]);
        const calc = new Calculator(argv[2],argv[3]);
          if(Options.includes(argv[4].toLowerCase())){
           switch(argv[4]){
             case 'multiply':
                console.log(calc.multiply);
                break;
              case 'add':
                console.log(calc.add);
                break;
              case 'substract':
                console.log(calc.substract);
                break;
              case 'division':
                console.log(calc.division);
                break;
          }            
        }
          else{
            console.log(`
            Usage:[node file.js <obj1> <obj2> <function>]
            Usable Functions are:[Divide,Multiply,Subtract,Add]`);
            exit(1);
        }
}

_main();
