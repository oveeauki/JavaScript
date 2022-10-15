# **JavaScript Array&String Methods**

## **Includes();**

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

## **toPrecision();**

```js
// To narrow down floats to precise decimal use toPrecision();
const float = 1.111111111;
return(float.toPrecision(3));
// Returns 1.111
```

## **replace();**

```js
// Replace A char inside of a string using replace();
const string = "Hello World";
const replaced = string.replace(string[0],"");
// Another Method if you want to replace a specific char inside a string you could do it with RegEx. In my sample i want to replace all "l" chars from the string so i use /\l/ RegEx pattern.
const string = "Hello World";
const replaced = string.replace(/\l/,"");
```

## **Map();**

```js
// For selecting all objects at once

let array = [7,3,32,12,83,231,12,1];
array.map(dat => {
console.log(dat);
});
```

## **Sort();**

```js
let array = [7,3,32,12,83,231,12,1];
let answ = array.sort((a,b) => (a-b));
console.log(answ);

//output => [1 3 7 12 12 32 83 231]
```

## **Every();**

```js
// Compare all values in array and return boolean if same or not
let array = [1,2,3,4];
var answ = arr.every(dat => dat == array[0]);
return(answ);
// Returns True or False
```

## **foreach();**

```js
// loop all objects with foreach
let array = [1,2,3,4];
array.foreach(dat => {console.log(dat)});
```
