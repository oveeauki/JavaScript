/**
@author 0xFreDi
@description Is String Empty 
                              */
const {stdout,stdin,exit} = require("process");
const r = require("readline").createInterface({
input:stdin,
output:stdout
});

class checker{
constructor(string){
this.str = string;
}
get check( ){
if(this.str == 0){
  return(`String Empty : [${this.str}]`);
}
else{
  return(`String Size : [${this.str}]`);
}
}
};

let _main = async( ) => {
  while(true){
    await new Promise((res) => {
      r.question("Enter a string\n\u279c ",(nn) => {
      const _check = new checker(nn.length);
      console.log(_check.check);
      res();
});
});  
}
}

_main();
