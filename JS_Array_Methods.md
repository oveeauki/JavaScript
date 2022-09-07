# **JavaScript Array Methods**

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
console.log(answ);

```

## **foreach();**

```js
// loop all objects with foreach
let array = [1,2,3,4];
array.foreach(dat => {console.log(dat)});
```
