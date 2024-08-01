// Weather Condition Emojis Handle
// TODO: change the API to some other less ridiculous one that has no duplicate conditions and fewer in general...
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
