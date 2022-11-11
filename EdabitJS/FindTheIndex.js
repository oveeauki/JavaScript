/**
@auth 0xFreDi
@desc Create a function that finds the index of a given item.
                                                              */
const {exit} = require("process");

let _main = async(array = [],int) => {
console.clear();
var resultarray = [];
for(let i=0;i<array.length;i++){
console.log("Indexing Currently: [%s]\nFound: [%s]\nTimes: [%d]",array[i],resultarray,resultarray.length); 
  await new Promise((res) => {
    if(array[i] == int){
      resultarray.push(array[i]);
}
      setTimeout(() => {
        console.clear();
          res();
          },1500);
});
}
exit(0);
}

_main([1,2,3,4,3,2,5,2,6,724],3); 
