/*
     Crypto Checker (1st edit)
                                */
const {API_u} = require("../Config/config.json");
const {stdout,stdin,exit} = require("process");
const {c} = require("../modules/colors");
const rl = require("readline").createInterface({
output:stdout,
input:stdin
});
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
let parsed = JSON.stringify(res.data);
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

let currency = (symb) => {
console.clear();
rl.question(`Enter Currency Symbol\n\u27A5 `,(value) => {
let call = new fetch(symb,value);
call.call();
});
};

let _init_ = () => {
console.clear();
rl.question(`Enter Crypto Name\n\u27A5 `,(symb) => {
currency(symb);
});
};

_init_();