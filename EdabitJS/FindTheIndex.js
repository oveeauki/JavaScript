/**
@auth 0xFreDi
@desc Create a function that finds the index of a given item.
                                                              */
const {exit} = require("process");

let _main = async(array = [],int) => {
var resultarray = [];
for(let i=0;i<array.length;i++){
await new Promise((res) => {
    if(array[i] == int){
        resultarray.push(array[i]);
        console.clear();  
        console.log("Found: [%s]\nTimes: [%d]",resultarray,resultarray.length); 
}
      setTimeout(() => {
        res();
      },1500);
});
}
exit(0);
}

_main([1,2,3,4,3,2,5,2,6,724],3); 
