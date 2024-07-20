// Weather Condition Emojis Handle
export function condcheck(cond){
  const we = {
  "Light drizzle":"🌧️",
  "Light rain shower":"🌧️",
  "Partly Cloudy ":"⛅",
  "Partly cloudy":"⛅",
  "Overcast":"⛅",
  "Sunny":"☀️",
  "Clear":"☀️",
  "Cloudy":"☁️",
  "Rain":"🌧️",
  "Moderate rain":"🌧️",
  "Heavy rain":"🌧️🌧️",
  "Patchy rain nearby":"🌦️",
  "Patchy light drizzle":":🌦️",
  "Light rain":"🌦️",
  "Snow":"❄️"
}

const conditionEmoji = we[cond];
return(conditionEmoji)
}
