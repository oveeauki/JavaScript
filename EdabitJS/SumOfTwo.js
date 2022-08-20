/**
@author 0xFreDi  
@description Basketball Points  
                               */
const {stdout,stdin,exit} = require("process");
const r = require("readline").createInterface({
output:stdout,
input:stdin
});

class solver {
constructor(two_p,three_P){
this.tp = two_p*2;
this.thp = three_P*3;
}
get _return(){
return this.total();
}
total = () => {
return(this.tp+this.thp);
}
};

let treepoints = (twopoints) => {
r.question(`Enter amount of tree pointers...\n\u279C `,(input) => {
let solve_ = new solver(twopoints,input);
console.log(solve_._return);
});
};

let twopoints = ( ) => {
r.question(`Enter amount of two pointers...\n\u279C `,(input) => {
treepoints(input);
});
};

let main = async( ) => {
twopoints();
};

main();