/**
*@auth 0xFreDi
*@desc 
                */
import ax from "axios"
import rl from "readline"
import {stdin,stdout,exit} from "process"
import fs from "fs"

const r = rl.createInterface({
input:stdin,
output:stdout
});

let two_d = (rows,cols) => {
  var newa = new Array(rows);
  for(let i=0;i<rows;i++){
    newa[i] = new Array(cols);
}
  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
      newa[i][j] = (i+j);
}
}
  return(newa);
}

let main = async() => {
  const jeps = two_d(6,5);
  console.log(jeps);
}

main();
