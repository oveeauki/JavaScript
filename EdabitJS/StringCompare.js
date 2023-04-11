/**
@auth 0xFreDi
@desc Compare Strings from a file                     
                                    */
import {exit} from "process";
import fs from "fs";
import {argv} from "process"
import path from 'path';

const __filename = path.dirname(".");

class functions{
  read(file){
    try{
      this.file = [];
      const lines = fs.readFileSync(file,'utf-8').split("\n");
      for(let line of lines){
        this.file.push(line);
      }
    }catch(error){
      console.error(error);
    }
  }
  getObjects(){
    let arr = [];
    for(let line of this.file){
      arr.push(line);
    }
    const joo = arr.filter(obj => obj != "");
    return(joo);
  }
}

const comp = (arr = []) => {
  let result = arr.every(dat => dat == arr[0]);
     if(result){
        console.log("Matches [%s]",arr[0]);
        exit(0);
      }
    else{
        console.log("Does not Match [%s]",arr[0])
        exit(1);
      }
}

const main = async() => {
  let file = argv[2];
    if(fs.existsSync(file)){
      let f = new functions();
        f.read(file);
          let arr = f.getObjects();
            let _comp = comp(arr);
    }
      else{
        console.error("Error! File:%s\nDoes not exist... Try again!",file);
        exit(1);
     }
}

main();
