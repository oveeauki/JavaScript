// Weather Condition Emojis Handle
export function condcheck(cond){
  const we = {
  "Partly Cloudy ":"⛅",
  "Overcast":"⛅",
  "Sunny":"☀️",
  "Cloudy":"☁️",
  "Rain":"🌧️",
  "Moderate rain":"🌧️",
  "Heavy rain":"🌧️🌧️",
  "Patchy rain nearby":"🌦️",
  "Light rain":"🌦️",
  "Snow":"❄️"
}

const conditionEmoji = we[cond];
return(conditionEmoji)
}
