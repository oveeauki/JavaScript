/*
                           [Edabit]
Create a function which validates whether a bridge is safe to walk on 
(i.e. has no gaps in it to fall through).
                                                                        */
const {stdout,stdin,exit} = require("process");
const rl = require("readline").createInterface({
input:stdin,
output:stdout
});

class bridge {
constructor(){
this._init_ = true;
}
isintact(string){
console.clear();
if(/\s/.test(string)){
stdout.write("broken\n");
this._init_ = false;
exit(0);
}
else{
stdout.write("not broken\n")
this._init_ = true;
}}
}

let main = async() => {
console.clear();
let _bridge = new bridge();
while(_bridge._init_){
await new Promise((res) => {
rl.question("Enter A bridge in form of any charss\n\u279C ",string => {
_bridge.isintact(string);
res();
});
});
}
};

main();