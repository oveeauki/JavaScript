/** 
   @author oveeauki
   @description OpenAI Sample
                              **/
const {Configuration,OpenAIApi} = require("openai");
const conf = new Configuration({
apiKey:"yourkey"
});
const openai = new OpenAIApi(conf);
const {stdout,stdin,exit} = require("process");
const rl = require("readline").createInterface({
input:stdin,
output:stdout
});
const {c} = require("../../../Modules/colors");

class apicall {
constructor(inputdata){
this.inpdata = inputdata;
}

async response(){
const response = openai.createCompletion({
  model: "text-davinci-002",
  prompt: `${this.inpdata}`,
  temperature: 0,
  max_tokens: 300
}).then(data => {
let resp = data.data.choices[0].text;
stdout.write(`${c.green}${resp}${c.reset}\n`);
}); 
}}

let _main = async() => {
while(true){
await new Promise((ressss) => {
rl.question(`Input query for OpenAI to respond ${c.green}\n\u279C${c.reset} ` ,(data) => {
switch(data){
case "exit":
   exit(0);
}
try{
let call = new apicall(data);
let res = call.response();
}catch{Error}
setTimeout(()=>{
ressss();
},6500);
});
});
}};

_main();
