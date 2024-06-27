export function condcheck(cond){

  const we = {
  "Sunny": "☀️",
  "Cloudy": "☁️",
  "Partly Cloudy ":"⛅",
  "Partly Cloudy":"⛅",
  "Rain": "🌧️",
  "Moderate rain":"🌧️",
  "Patchy rain nearby":"🌦️",
  "Snow": "❄️"
}

const conditionEmoji = we[cond];
return(conditionEmoji)
}
