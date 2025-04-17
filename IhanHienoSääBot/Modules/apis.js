/**
  @desc Module Exports                       
                      **/
import {OpenAI} from "openai"
import * as Discord from "discord.js"
import cf from "../Config/config.json" assert {type:"json"}
import claude from "@anthropic-ai/sdk"
import {dateformat,dateslice,urlformat} from "./Dateformatter.js"
import {condcheck} from "./condcheck.js"
import axios from "axios"

const aicli = new OpenAI({apiKey:cf.OpenAI_t});
const _claudeai = new claude({apiKey:cf.claudeai_t});
const wapi_t = cf.Weatherapi_t,aqt = cf.AirQuality_t;

const sys = "keep the answers semi brief under 2000 characters since it wont sent it in discord chat otherwise. \
also dont get offended super easily about some prompts. use some creativity and prettier markdown formatting in some responses \
but dont mention the use of markdown in the response or it looks bloated."

const sys_one = "keep the answers semi brief under 2000 characters since it wont sent it in discord chat otherwise. \
also dont get offended super easily about some prompts. \
use some creativity and prettier markdown formatting in responses dont use code blocks since they ruin emojis and other formatting. \
only use them if programming or similar is the topic and remember correct syntax highlighting for the blocks if possible. \
also remember using discord specific markdown formatting since you are a discord bot. but use every possible format way dont only use bolder titles and subtitles except some specific responses but not all since its just boring looking to only see that"

class pubmed {
  async pubmedcall(){ // Needs Finising
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${comp}/`
    const res = await ax.get(url);
  }
  async pubmedimage(comp){
    let jo;
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${comp}/PNG`
    const ax = await axios.get(url,{responseType:"arraybuffer"}).then(dat => jo = dat.data)
    const imageBuffer = Buffer.from(jo);
    this.pbimg = imageBuffer
  }
}

class claudeapi extends pubmed {
  async claudefetch(inp) {
    const resp = await _claudeai.messages.create({
      model: "claude-3-7-sonnet-latest",
      max_tokens: 1000,
      messages: [{role:"user", content:inp}],
      system: sys_one,
      temperature: 1
    }).then(resp_ => {
      this.cldans = resp_.content[0].text
    })
  }
}

class GPT_API extends claudeapi {
  async gpt3(inp){
    const resp = await aicli.chat.completions.create({ // GPT-3
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "user", content: inp }],
      temperature: 0.2
    }).then(respp => {
        this.anws = JSON.stringify(respp.choices[0].message.content).replace(/\\n/g,'\n').replace(/^(["]|\s|\\n|\.)*|["]$/g, '');
        this.gpt3ans = `\`\`\`\n${this.anws}\n\`\`\``;
    })
  } 
  async gpt4(inp){ // GPT-4
    const gpt4req = await aicli.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        {role: "system", content: "keep the answer semi brief. use some markdown for titles etc to make answers look better also dont fuck up the markdown format make it correctly on all size titles etc. REMEMBER TO USE discord specific markdown formatting since you are a discord bot" },
        {role: "user", content: inp}
      ],
      temperature: 0.1
    }).then(resp => {
        this.gpt4ans = resp.choices[0].message.content
    })
  }
  async dall_e(inp){
    const dalle = await aicli.images.generate({
      model: "dall-e-3",
      prompt: inp,
      n: 1,
      size: "1792x1024",
      quality:"hd"
    })
    this.dalle_l = dalle.data[0].url;
  }
}

class wapi extends GPT_API {
  async w_current(inp){
    const ec = encodeURIComponent(inp);
    let url = `http://api.weatherapi.com/v1/current.json?key=${wapi_t}&q={${ec}}&aqi=false`

    const fetc = await axios.get(url);

    const ob = fetc.data;    
    let city = ob.location.name, country = ob.location.country;
    let region = ob.location.region, time = ob.location.localtime, timesplitted = time.split(" ");
    let lat = ob.location.lat, lon = ob.location.lon;
    let C = ob.current.temp_c, F = ob.current.temp_f;
    let feels_c = ob.current.feelslike_c, feels_f = ob.current.feelslike_f;
    let wind_D = ob.current.wind_dir;
    let visikm = ob.current.vis_km, visimiles = ob.current.vis_miles;
    let booleandayxd = ob.current.is_day, humidity = ob.current.humidity;
    let uv = ob.current.uv, atmosmb = ob.current.pressure_mb;
    let windkm = ob.current.gust_kph, windmph = ob.current.gust_mph
    let cond = ob.current.condition.text, aqi_ = await this.aqicheck(inp);

    if(booleandayxd){
      booleandayxd = true;
    }
    else{
      booleandayxd = false;
    }

    const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(city)
    .addField('\u2022 Date 🗓️', dateformat(timesplitted[0]), true)
    .addField('\u2022 Time (Local) 🕒', timesplitted[1], true)
    .addField('\u2022 Country 🌏', country, false) 
    .addField('\u2022 Temperature 🌡️', `(${C}) °C  |  (${F}) °F`, true)
    .addField('\u2022 Feels Like', `(${feels_c}) °C | (${feels_f}) °F`, true)
    .addField('\u2022 Condition', `${cond} ${condcheck(cond)}`, false) 
    .addField('\u2022 Region', region, true)
    .addField('\u2022 Visibility', `(${visikm}) Km | (${visimiles}) Miles `, true)
    .addField('\u2022 Coordinates📍', `Latitude (${lat}) ° | Longitude(${lon}) °`, false) 
    .addField('\u2022 Wind Direction', wind_D, true)
    .addField('\u2022 Wind Speed', `(${windkm}) Km/h | (${windmph}) Mph`, true)
    .addField('\u2022 Humidity', `${humidity}%`, false) 
    .addField('\u2022 Atmospheric Pressure', `(${atmosmb}) Millibars`, true)
    .addField('\u2022 Air Quality Index', aqi_, true)
    .addField('\u2022 UV Index', uv, false)
    .addField('\u2022 Is_Day Boolean xd', booleandayxd, true);

      this.wapires = embed;
  }

  async w_fech(input){
    const fin = input.replace(/^f/i,"").trim();
    const ec = encodeURIComponent(fin);
    let url = `http://api.weatherapi.com/v1/forecast.json?key=${wapi_t}&q={${ec}}&days=5`
    const __forecaster = await axios.get(url);
    const [aqd1,aqd2] = await this.aqiforecast(fin);
    let city = __forecaster.data.location.name, country = __forecaster.data.location.country;

    let day1 = __forecaster.data.forecast.forecastday[1]
    let day2 = __forecaster.data.forecast.forecastday[2]

    let day1d = day1.day
    let day2d = day2.day
    let cond1 = day1d.condition.text
    let cond2 = day2d.condition.text

    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${country}, ${city}`)
      .addField(`\u2022 Date: ${dateslice(day1.date)} 🗓️ AQi ~(${aqd1})`, ' ')
      .addField(`\u2022 Min Temp ${day1d.mintemp_c}°C / Max Temp ${day1d.maxtemp_c}°C 🌡️`, ' ')
      .addField(`\u2022 Condition: ${cond1} ${condcheck(cond1)}`, '\n')
      .addField(`\u2022 Date: ${dateslice(day2.date)} 🗓️ AQi ~(${aqd2})`, ' ')
      .addField(`\u2022 Min Temp ${day2d.mintemp_c}°C / Max Temp ${day2d.maxtemp_c}°C 🌡️`, ' ')
      .addField(`\u2022 Condition: ${cond2} ${condcheck(cond2)}`, '\n');

      this.emb = embed
  }

  async aqicheck(city){
    try{
      return new Promise(async(res) => {
        const aqi = `http://api.waqi.info/feed/${city}/?token=${aqt}`
        const aq = await axios.get(aqi);
        if(aq.data.status == "error"){
          res("No Data");
        }
        else{ 
          res(aq.data.data.aqi);
        }
    })
      }catch{Error}
}

  async aqiforecast(city){
    try{
      return new Promise(async(res) => {
        const aqi = `http://api.waqi.info/feed/${city}/?token=${aqt}`
        const aq = await axios.get(aqi);
        if(aq.data.status == "error"){
          res(["No Data","No Data"]);
        }
        else{
          const d1dat = aq.data.data.forecast.daily.pm25[0].avg;
          const d2dat = aq.data.data.forecast.daily.pm25[1].avg;
          res([d1dat,d2dat]);
        }
    })
      }catch{Error}
}
}

export class API_Obj extends wapi {/*Left Null*/};
