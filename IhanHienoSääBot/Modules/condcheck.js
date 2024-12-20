//condcheck
export function condcheck(cond){
  const jo = cond.trim();
	  const we = {
		    "Light drizzle":"🌧️",
		    "Light rain shower":"🌧️",
		    "Partly Cloudy":"⛅",
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
		    "Snow":"❄️",
        "Blizzard":"🌨️",
        "Moderate or heavy snow showers":"🌨️",
        "Light snow":"🌨️",
			  "Heavy snow":"🌨️🌨️",
        "Fog":"🌫️",
        "Mist":"🌫️"
	  }

	const conditionEmoji = we[jo];
	return(conditionEmoji)
}
