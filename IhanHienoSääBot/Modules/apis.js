/**
                             
                      **/
import {OpenAI} from "openai"
import * as Discord from "discord.js"
import cf from "../Config/config.json" assert {type: "json"}
import claude from "@anthropic-ai/sdk"

const aicli = new OpenAI({apiKey:cf.OpenAI_t});
const client = new Discord.Client();
const _claudeai = new claude({apiKey: cf.claudeai_t});

export class claudeaiapi {
  constructor(inputmsg) {
    this.inp = inputmsg;
  }
  async claudefetch() {
    const resp = await _claudeai.messages.create({
      max_tokens: 1000,
      model: "claude-3-opus-20240229",
      messages: [{ role: "user", content: this.inp }],
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
      messages: [{ role: "user", content: this.inp }],
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
