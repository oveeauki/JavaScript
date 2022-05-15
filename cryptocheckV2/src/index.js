/*
          Crypto Checker 
    (2nd edit with argv[] input)
                                   */
const {API_u} = require("../Config/config.json");
const {argv} = require("process");
const {stdout,exit} = require("process");
const {c} = require("../modules/colors");
const axios = require("axios").default;
/*----------------------------------------------*/
class fetch {
constructor(s_Crypto,fiat_C){
this.name = s_Crypto;
this.currency = fiat_C;
this.link = `${API_u}${this.name}&tsyms=${this.currency}`
}

async call(){
console.clear();
let fetced = Promise.all(await axios.get(this.link).then(res => {
let parsed = JSON.stringify(res.data)
this.final = parsed.match(/(\d+)/).pop().split(" ");
stdout.write(
`--------------------------
|\t${c.green}[${this.name}]${c.reset}\t\t|
|   Price = [${this.final}]${this.currency}\t|
---------------------------\n`);
}));
exit(0);
}
};

let error = (a,b) => {
stdout.write(`Error! String Sizes must be atleast 3 chars...\n
1st Argument Size:[${a}]\n
2nd Argument Size:[${b}]\n`);
exit(1);
};

let _init_ = () => {
console.clear();
let argv2,argv3;
if(argv[2].length < 3 || argv[3].length < 3){
error(argv[2].length,argv[3].length);
}
else{
try{
argv2 = argv[2].toUpperCase(),argv3 = argv[3].toUpperCase();
let api = new fetch(argv2,argv3);
api.call();
}catch{Error};
}
return(0);
};

_init_();