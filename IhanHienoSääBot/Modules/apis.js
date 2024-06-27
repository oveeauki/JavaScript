/**
  @desc Module Exports                       
                      **/
import {OpenAI} from "openai"
import * as Discord from "discord.js"
import cf from "../Config/config.json" assert {type: "json"}
import claude from "@anthropic-ai/sdk"
import {dateformat,urlformat} from "./Dateformatter.js"
import ax from "axios"
import {condcheck} from "./condcheck.js"

const aicli = new OpenAI({apiKey:cf.OpenAI_t});
const client = new Discord.Client();
const _claudeai = new claude({apiKey: cf.claudeai_t});
const Weather_API_t = cf.Weatherapi_t;
const sys = "keep the answers semi brief under 2000 characters since it wont sent it in discord chat otherwise"

export class claudeaiapi {
  constructor(inputmsg) {
    this.inp = inputmsg;
  }
  async claudefetch() {
    const resp = await _claudeai.messages.create({
      max_tokens: 1000,
      model: "claude-3-opus-20240229",
      messages: [{ role: "user", content: this.inp }],
      system:sys,
      temperature: 0.3
    }).then(resp_ => {
      const str = resp_.content[0].text
      this.me = str
    })
  }
}

export class AIAPI {
  constructor(input) {
    this.inp = input;
  }
  async apifetch() {
    const resp = await aicli.chat.completions.create({ // GPT-3
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "user", content: this.inp }],
      temperature: 0.2
    }).then(respp => {
      this.anws = JSON.stringify(respp.choices[0].message.content).replace(/\\n/g,'\n').replace(/^(["]|\s|\\n|\.)*|["]$/g,'');
      this.em = `\`\`\`\n${this.anws}\n\`\`\``;
    })
  }
  async apigpt4() { // GPT-4
    const gpt4req = await aicli.chat.completions.create({
      model: "gpt-4o",
       messages:[
      {role:"system",content:"keep the answer semi brief"},
      {role:"user",content:this.inp}
    ],
      temperature: 0.3
    }).then(resp => {
      this.me = resp.choices[0].message.content
    })
  }
  async dall_e() {
    const dalle = await aicli.images.generate({
      model: "dall-e-3",
      prompt: this.inp,
      n: 1,
      size: "1024x1024"
    })
    this.me = dalle.data[0].url;
  }
}

export class weatherapi{
  async w_current(inp){
        let __message;
        const encodedChoice = encodeURIComponent(inp);
        let url = `http://api.weatherapi.com/v1/current.json?key=${Weather_API_t}&q={${encodedChoice}}&aqi=no`
        const fetc = await ax.get(url).then(dat => {__message = dat.data});
        let city = __message.location.name, country = __message.location.country;
        let region = __message.location.region, time = __message.location.localtime,timesplitted = time.split(" ");
        let lat = __message.location.lat,lon = __message.location.lon;
        let C = __message.current.temp_c, F = __message.current.temp_f;
        let feels_c = __message.current.feelslike_c, feels_f = __message.current.feelslike_f;
        let wind_D = __message.current.wind_dir; 
        let visikm = __message.current.vis_km, visimiles = __message.current.vis_miles;
        let booleandayxd = __message.current.is_day, humidity = __message.current.humidity;
        let uv = __message.current.uv, atmosmb = __message.current.pressure_mb;
        let windkm = __message.current.gust_kph, windmph = __message.current.gust_mph
        let cond = __message.current.condition.text

        if(booleandayxd){
          booleandayxd = true;
        }
        else{
          booleandayxd = false;
        }
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(city)
        .addField('\u2022 Date 🗓️',timesplitted[0],true)
        .addField('\u2022 Time (Local)🕒',timesplitted[1],true)
        .addField('\u2022 Country 🌏',country)
        .addField('\u2022 Temperature 🌡️',`(${C})°C  |  (${F})°F`,true)
        .addField('\u2022 Feels Like',`(${feels_c})°C | (${feels_f})°F`,true)
        .addField('\u2022 Condition',`${cond} ${condcheck(cond)}`)
        .addField('\u2022 Region ',region,true)
        .addField('\u2022 Visibility',`(${visikm})Km |(${visimiles}) Miles `,true)
        .addField('\u2022 Cordinates',`Latitude (${lat})° | Longitude(${lon})°`)
        .addField('\u2022 Wind Direction',wind_D,true)
        .addField('\u2022 Wind Speed',`(${windkm}) Km/h | (${windmph}) Mph`,true)
        .addField('\u2022 Humidity',`${humidity}%`)
        .addField('\u2022 UV Index ',uv,true)
        .addField('\u2022 Is_Day Boolean xd',booleandayxd,true);

        this.res = embed
}

  async w_fech(input){
    let __forecaster;
      const encodedChoice = encodeURIComponent(input);
      let url = `http://api.weatherapi.com/v1/forecast.json?key=${Weather_API_t}&q={${encodedChoice}}&days=5`
      const fetc = await ax.get(url).then(dat => {__forecaster = dat.data});

      let city = __forecaster.location.name,country = __forecaster.location.country;
      let region = __forecaster.location.region;

      let day0 = __forecaster.forecast.forecastday[0],day1 = __forecaster.forecast.forecastday[1]
      let day2 = __forecaster.forecast.forecastday[2],day3 = __forecaster.forecast.forecastday[3]
      let day4 = __forecaster.forecast.forecastday[4]
  
      let day0d = day0.day
      let day1d = day1.day
      let day2d = day2.day
      /*let day3d = day3.day
      let day4d = day4.day      
*/
      let cond1 = day1d.condition.text
      let cond2 = day2d.condition.text
     /* let cond3 = day3d.condition.text
      let cond4 = day4d.condition.text
*/
       const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${country},${city}`)
        .addField(`\u2022 Date: ${dateformat(day1.date)} 🗓️`,' ')
        .addField(`\u2022 Min Temp ${day1d.mintemp_c}°C / Max Temp ${day1d.maxtemp_c}°C 🌡️`,' ')
        .addField(`\u2022 Condition: ${cond1} ${condcheck(cond1)}`,'\n')
        .addField(`\u2022 Date: ${dateformat(day2.date)} 🗓️ `,' ')
        .addField(`\u2022 Min Temp ${day2d.mintemp_c}°C / Max Temp ${day2d.maxtemp_c}°C 🌡️`,' ')
        .addField(`\u2022 Condition: ${cond2} ${condcheck(cond2)}`,'\n')
      /* .addField(`\u2022 Date: ${dateformat(day3.date)} 🗓️ `,' ')
        .addField(`\u2022 Min Temp ${day3d.mintemp_c}°C / Max Temp ${day3d.maxtemp_c}°C 🌡️`,' ')
        .addField(`\u2022 Condition: ${cond3} ${condcheck(cond3)}`,'\n')
*/
      this.emb = embed
}
}
