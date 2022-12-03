/**
*@auth 0xFreDi
*@desc RegEx Filtration Test
                            */
const {stdin,stdout,exit} = require("process");
const r = require("readline").createInterface({
input:stdin,
output:stdout
});

class regex {
constructor(string){
this.str = string
}
filternum = ( ) => {
const res = this.str.match(/([0-9])/g).join();
return(res);
}
filterchars = ( ) => {
const res = this.str.match(/([A-Za-z])/g).join();
return(res);
}
}

let select = (str) => {
console.log("Input:[%s]",str);
r.question("(1) Filter Numbers\n(2) Filter Chars\n\u279c ",(int) => {
  const ex = new regex(str);
    console.clear();
      switch(int){
        case "1":
          console.log("Numbers Filtered Were: [%s]",ex.filternum());
          break;
        case "2":
          console.log("Chars Filtered Were: [%s]",ex.filterchars());
          break;    
}
main();
});
}

let main = async( ) => {
while(true){
  await new Promise((res) => {
    r.question("Enter A String of Random Numbers and Chars\n\u279c ",(str) => {
      console.clear();
      select(str);
      res();
});
});
}
}

main();
