# **Methods&Etc Basics**

### **JavaScript Array&String Methods**

### **Test();**

```js
// This is A RegEx String method and not a standard one
const str = "ok ok";
const value = /\s/.test(str);
return(value); // Returns Boolean
```

### **Includes();**

```js
const Options = ["a","b","c","d"];
const input = "b";
if(!Options.includes(input)){
  console.log(`No Match!`);
  return(1);
}
else{
  console.log("Matched!");
  return(0);
}
```

### **toPrecision();**

```js
// To narrow down floats to precise decimal use toPrecision();
const float = 1.111111111;
return(float.toPrecision(3));
// Returns 1.111
```

### **replace();**

```js
// Replace A char inside of a string using replace();
const string = "Hello World";
const replaced = string.replace(string[0],"");
// Another Method if you want to replace a specific char inside a string you could do it with RegEx. In my sample i want to replace all "l" chars from the string so i use /\l/ RegEx pattern.
const string = "Hello World";
const replaced = string.replace(/\l/,"");
```

### **Map();**

```js
// For selecting all objects at once
let array = [7,3,32,12,83,231,12,1];
array.map(dat => {
console.log(dat);
});

// Here example how to reverse all objects in array with map
const sortstrings = async(arr = []) => {
  let revstrings = [];
  let reves = arr.map(str => str.split('').reverse().join(''));
  for(let i=0;i<arr.length;i++){
    await new Promise((res) => {
      //console.clear();
      revstrings.push(reves[i]);
      console.log("Pushing [%s]",reves[i]);
      res();
        });
    }
      exit(0);
}

```

### **Sort();**

```js
let array = [7,3,32,12,83,231,12,1];
let answ = array.sort((a,b) => (a-b));
console.log(answ);
//output => [1 3 7 12 12 32 83 231]
```

### **Every();**

```js
// Compare all values in array and return boolean if same or not
let array = [1,2,3,4];
var answ = arr.every(dat => dat == array[0]);
return(answ);
// Returns True or False
```

### **foreach();**

```js
// loop all objects with foreach
let array = [1,2,3,4];
array.foreach(dat => {console.log(dat)});
```

### **filter();**
```js
// Filtering all newlines out of array example
const array = [
'a',  '\n', 'b',  '\n', 'c',
'\n', 'd',  '\n', 'e',  '\n',
'f',  '\n', 'g',  '\n', 'h',
'\n', 'i',  '\n', 'j',  '\n',
'k'
]
const filtered = array.filter(obj => obj != '\n');
return(filtered);
/* Returns
const array = [
'a', 'b', 'c', 'd',
'e', 'f', 'g', 'h',
'i', 'j', 'k'
] */
```

### **Split();**
```js
const string = "joo jees jaa";
const splitted = string.split(" "); // Splits the string into seperate objects in array at every spacebar
return(splitted); // Returns:[ 'joo', 'jees', 'jaa' ]
```

### **For Loops**
```js
// for of loop
  let arr = ["k","3","34","3423"]
  let a = []
  for(const abc of arr){
    a.push(abc);
}
    return(a); // Returns [ 'k', '3', '34', '3423' ]

// for in loop
  let arr = ["k","3","34","3423"]
  let a = []
  for(let abc in arr){
    a.push(arr[abc]);
}
    return(a); // Returns [ 'k', '3', '34', '3423' ]
```
