/**
  @desc Module Exports                       
                      **/
import {OpenAI} from "openai"
import * as Discord from "discord.js"
import cf from "../Config/config.json" assert {type: "json"}
import claude from "@anthropic-ai/sdk"
import {dateformat,dateslice,urlformat} from "./Dateformatter.js"
import {condcheck} from "./condcheck.js"
import axios from "axios"

const aicli = new OpenAI({apiKey: cf.OpenAI_t});
const _claudeai = new claude({apiKey: cf.claudeai_t});
const Weather_API_t = cf.Weatherapi_t;

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
    const ax = await axios.get(url, { responseType: "arraybuffer" }).then(dat => jo = dat.data)
    const imageBuffer = Buffer.from(jo);
    this.pbimg = imageBuffer
  }
}

class claudeapi extends pubmed {
  async claudefetch(inp) {
    const resp = await _claudeai.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      messages: [{ role: "user", content: inp }],
      system: sys_one,
      temperature: 1
    }).then(resp_ => {
      this.cldans = resp_.content[0].text
    })
  }
}

class GPT_API extends claudeapi {
  async apifetch(inp){
    const resp = await aicli.chat.completions.create({ // GPT-3
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "user", content: inp }],
      temperature: 0.2
    }).then(respp => {
      this.anws = JSON.stringify(respp.choices[0].message.content).replace(/\\n/g, '\n').replace(/^(["]|\s|\\n|\.)*|["]$/g, '');
      this.gpt3ans = `\`\`\`\n${this.anws}\n\`\`\``;
    })
  }
  async gpt4(inp){ // GPT-4
    const gpt4req = await aicli.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {role: "system", content: "keep the answer semi brief. use some markdown for titles etc to make answers look better also dont fuck up the markdown format make it correctly on all size titles etc. REMEMBER TO USE discord specific markdown formatting since you are a discord bot" },
        {role: "user", content: inp}
      ],
      temperature: 0.3
    }).then(resp => {
      this.gpt4ans = resp.choices[0].message.content
    })
  }
  async dall_e(inp){
    const dalle = await aicli.images.generate({
      model: "dall-e-3",
      prompt: inp,
      n: 1,
      size: "1024x1024"
    })
    this.dalle_l = dalle.data[0].url;
  }
}

class wapi extends GPT_API {
  async w_current(inp){
    let __message;
    const encodedChoice = encodeURIComponent(inp);
    let url = `http://api.weatherapi.com/v1/current.json?key=${Weather_API_t}&q={${encodedChoice}}&aqi=no`
    const fetc = await axios.get(url).then(dat => { __message = dat.data });
    let city = __message.location.name, country = __message.location.country;
    let region = __message.location.region, time = __message.location.localtime, timesplitted = time.split(" ");
    let lat = __message.location.lat, lon = __message.location.lon;
    let C = __message.current.temp_c, F = __message.current.temp_f;
    let feels_c = __message.current.feelslike_c, feels_f = __message.current.feelslike_f;
    let wind_D = __message.current.wind_dir;
    let visikm = __message.current.vis_km, visimiles = __message.current.vis_miles;
    let booleandayxd = __message.current.is_day, humidity = __message.current.humidity;
    let uv = __message.current.uv, atmosmb = __message.current.pressure_mb;
    let windkm = __message.current.gust_kph, windmph = __message.current.gust_mph
    let cond = __message.current.condition.text

    if (booleandayxd) {
      booleandayxd = true;
    }
    else {
      booleandayxd = false;
    }

    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(city)
      .addField('\u2022 Date 🗓️', dateformat(timesplitted[0]), true)
      .addField('\u2022 Time (Local) 🕒', timesplitted[1], true)
      .addField('\u2022 Country 🌏', country)
      .addField('\u2022 Temperature 🌡️', `(${C}) °C  |  (${F}) °F`, true)
      .addField('\u2022 Feels Like', `(${feels_c}) °C | (${feels_f}) °F`, true)
      .addField('\u2022 Condition', `${cond} ${condcheck(cond)}`)
      .addField('\u2022 Region', region, true)
      .addField('\u2022 Visibility', `(${visikm}) Km | (${visimiles}) Miles `, true)
      .addField('\u2022 Cordinates', `Latitude (${lat}) ° | Longitude(${lon}) °`)
      .addField('\u2022 Wind Direction', wind_D, true)
      .addField('\u2022 Wind Speed', `(${windkm}) Km/h | (${windmph}) Mph`, true)
      .addField('\u2022 Humidity', `${humidity}%`)
      .addField('\u2022 Atmospheric Pressure', `(${atmosmb}) Millibars`,true)
      .addField('\u2022 UV Index', uv, true)
      .addField('\u2022 Is_Day Boolean xd', booleandayxd,);

      this.wapires = embed
  }

  async w_fech(input){
    let __forecaster;
    const encodedChoice = encodeURIComponent(input);
    let url = `http://api.weatherapi.com/v1/forecast.json?key=${Weather_API_t}&q={${encodedChoice}}&days=5`
    const fetc = await axios.get(url).then(dat => { __forecaster = dat.data });

    let city = __forecaster.location.name, country = __forecaster.location.country;
    let region = __forecaster.location.region;

    let day0 = __forecaster.forecast.forecastday[0], day1 = __forecaster.forecast.forecastday[1]
    let day2 = __forecaster.forecast.forecastday[2], day3 = __forecaster.forecast.forecastday[3]
    let day4 = __forecaster.forecast.forecastday[4]

    let day0d = day0.day
    let day1d = day1.day
    let day2d = day2.day
    let cond1 = day1d.condition.text
    let cond2 = day2d.condition.text

    /*    let day3d = day3.day
          let day4d = day4.day      
          let cond3 = day3d.condition.text
          let cond4 = day4d.condition.text
    */
    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${country},${city}`)
      .addField(`\u2022 Date: ${dateslice(day1.date)} 🗓️`, ' ')
      .addField(`\u2022 Min Temp ${day1d.mintemp_c}°C / Max Temp ${day1d.maxtemp_c}°C 🌡️`, ' ')
      .addField(`\u2022 Condition: ${cond1} ${condcheck(cond1)}`, '\n')
      .addField(`\u2022 Date: ${dateslice(day2.date)} 🗓️ `, ' ')
      .addField(`\u2022 Min Temp ${day2d.mintemp_c}°C / Max Temp ${day2d.maxtemp_c}°C 🌡️`, ' ')
      .addField(`\u2022 Condition: ${cond2} ${condcheck(cond2)}`, '\n')

    /* Shit Api gives 2 day forecast only so need to find better one....
      .addField(`\u2022 Date: ${dateslice(day3.date)} 🗓️ `,' ')
      .addField(`\u2022 Min Temp ${day3d.mintemp_c}°C / Max Temp ${day3d.maxtemp_c}°C 🌡️`,' ')
      .addField(`\u2022 Condition: ${cond3} ${condcheck(cond3)}`,'\n')
    */
    this.emb = embed
  }
}

export class API_Obj extends wapi { };
