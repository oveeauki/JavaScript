/**
*@auth 0xFreDi
*@desc Basic One String Shell Commands Through Child Process
                                                            */
const {stdin,stdout,exit} = require("process");
const {spawn} = require("child_process");
const r = require("readline").createInterface({
input:stdin,
output:stdout
});

let sh_spawn = (input) => {
  if(input.toLowerCase() == "exit"){
    exit(0);
}
else{
    const sh = spawn(input);
    sh.stdout.on("data",data => {
      console.log("Returned:\n [%s]",data.toString());
      main();
});
}  
}

let main = async() => {
  while(true){
    await new Promise((res) => {
      r.question("Enter a command to execute\n\u279c ",(i) => {
        sh_spawn(i);
        res();
});
});
}
}

main();
