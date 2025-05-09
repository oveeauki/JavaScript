// To do: implement easier with GPT function call to return emoji based on input. erasing this messy cluttery crap

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
        "Light freezing rain":"🌧️🌨️",
        "Moderate or heavy rain with thunder":"⛈️",
		    "Snow":"❄️",
        "Blizzard":"🌨️",
        "Moderate or heavy snow showers":"🌨️",
        "Light snow":"🌨️",
        "Moderate snow":"🌨️",
			  "Heavy snow":"🌨️🌨️",
        "Fog":"🌫️",
        "Freezing fog":"🌫️",
        "Mist":"🌫️"
	  }

	const conditionEmoji = we[jo];
	return(conditionEmoji)
}
