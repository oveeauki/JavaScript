# **OpenAI Sample API interface**
* ### For more information goto [OpenAI Docs](https://beta.openai.com/docs/introduction)

<img src="https://openai.com/content/images/2022/05/twitter-1.png" style="width:560px;height:300px;"/>

## **Installation**


* ### **git clone this =>** (https://github.com/oveeauki/JavaScript.git)
* ### **Then cd into the OpenAI repo and do**

``` 
npm install
```


* ### **In the field of the response property i used ReadLine module for simple user input**
 
```js
const response = openai.createCompletion({
  model: "text-davinci-002",
  prompt: "<input>",
  temperature: 0,
  max_tokens: 300
});
```

* ### **Enter your OpenAI API key by making new configuration object**

```js
const conf = new Configuration({
apiKey:"<Key here>"
});
```
