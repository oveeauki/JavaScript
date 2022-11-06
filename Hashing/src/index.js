/**
@auth oveeauki
@desc hashing test                            
                   */
const {stdin,stdout,exit} = require("process");
const hsh = require("hasha");
const r = require("readline").createInterface({
input:stdin,
output:stdout
});

class hashing_methods{
constructor(input,method,algorithm){
this.inp = input;
this.met = method;
this.alg = algorithm;
}
get sha1(){
return(hsh.async(`${this.inp}`,{algorithm:"sha1",encoding:`${this.alg}`}));
}
get sha256(){
return(hsh.async(`${this.inp}`,{algorithm:"sha256",encoding:`${this.alg}`}));
}
get sha512(){
return(hsh.async(`${this.inp}`,{algorithm:"sha512",encoding:`${this.alg}`}));
}
get md5(){
return(hsh.async(`${this.inp}`,{algorithm:"md5",encoding:`${this.alg}`}));
}
}

let fetch = async(str,method,enc) => {
  const hm = new hashing_methods(str,method,enc);
    switch(method){
      case "sha1":
        const resp1 = await hm.sha1;
        console.log("Retured :[%s]",resp1);
        break;
      case "sha256":
        const resp2 = await hm.sha256;
        console.log("Retured :[%s]",resp2);
        break;
      case "sha512":
        const resp3 = await hm.sha512;
        console.log("Retured :[%s]",resp3);
        break;
      case "md5":
        const resp4 = await hm.md5;
        console.log("Retured :[%s]",resp4);
        break;
}
string();
}

let encoding = (str,method) => {
console.clear();
  r.question(`Enter Encoding Form to return the hash in\n
Available Are:\nBase64\nBuffer\nHex\nLatin1\n\u279c `,(i) => {
      fetch(str,method,i);
});
}

let hashmethod = (str) => {
  r.question("Method: =>\nsha1\nsha256\nsha512\nmd5\n\u279c ",(i) => {
    encoding(str,i);
  });
} 

let string = async() => {
  for(;;){
    await new Promise((res) => {
      r.question("Enter a String to hash\nEnter(Exit) To Exit\n\u279c ",(i) => {
      if(i.toLowerCase() == "exit"){
      exit(0);
}
      else {
      console.clear();
      hashmethod(i);
      res();
}
});
});
}
}

string();