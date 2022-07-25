/**
@Author oveeauki
@Description Argc & Argv  
                         **/
const {stdout,exit,argv} = require("process");

let _argv = () => {
for(var i=0;i<argv.length;i++){
if(i <= 1){
stdout.write(`System Args (${i+1}) = [${argv[i]}]\n`)
}
else{
stdout.write(`User Args (${i+1}) = [${argv[i]}]\n`)
}
exit(0);
}};

_argv();