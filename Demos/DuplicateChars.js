/**
@author 0xFreDi
@description Create a function that takes a string 
and returns a string in which each character is repeated once.  
                                                               */
const {stdout,stdin,exit} = require("process");
const r = require("readline").createInterface({
input:stdin,
output:stdout
});

class stringdup {
constructor(string){
this.str = string;
this.snd = [];
}
get duplicate(){
for(var i=0;i<this.str.length;i++){ 
this.snd += this.str[i] + this.str[i];
}
return(this.snd);
}
};

let _main = (string) => {
const strdup = new stringdup(string);
console.log("Retuned : [%s]",strdup.duplicate)
}

_main("toimii");
