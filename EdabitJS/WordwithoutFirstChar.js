/**
@auth oveeauki
@desc Word without First Character
                                  */
const {stdout,stdin,exit} = require("process");
const r = require("readline").createInterface({
input:stdin,
output:stdout
});

class new_word{
constructor(string){
this.str = string;
}
get result(){
return(this.str);
}
};

let _main = async( ) => {
r.question("Enter A String\n\u279c " ,(inn) => {
const _new_word = new new_word(inn.replace(inn[0] ,""));
console.log("Returned [%s]",_new_word.result);
exit(0);
});
}

_main();
