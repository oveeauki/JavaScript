export function condcheck(cond){

  const we = {
  "Partly Cloudy ":"⛅",
  "Sunny": "☀️",
  "Cloudy": "☁️",
  "Rain": "🌧️",
  "Moderate rain":"🌧️",
  "Heavy rain":"🌧️🌧️",
  "Patchy rain nearby":"🌦️",
  "Snow": "❄️"
}

const conditionEmoji = we[cond];
return(conditionEmoji)
}