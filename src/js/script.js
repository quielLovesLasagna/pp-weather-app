"use strict";

import clearImage from "../../images/clear.png";
import cloudsImage from "../../images/clouds.png";
import drizzleImage from "../../images/drizzle.png";
import mistImage from "../../images/mist.png";
import rainImage from "../../images/rain.png";
import snowImage from "../../images/snow.png";

// ELEMENT/.
const APIKEY = "a707d9b2c96a826ef5f94abfef56ed9e";
const APIURL =
	"https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const inputEl = document.querySelector(".card__input");
const searchBtn = document.querySelector(".card__button");
const resultsEl = document.querySelector(".weather");
const locationEl = document.querySelector(".weather__location");
const temperatureEl = document.querySelector(".weather__temperature");
const weatherImgEl = document.querySelector(".weather__image");
const weatherTagEl = document.querySelector(".weather__tag");
const humidityEl = document.querySelector(".weather__humidity");
const windEl = document.querySelector(".weather__wind");

// FUNCTION/S
async function getWeatherData(location) {
	try {
		// -- Request weather data
		const response = await fetch(APIURL + location + "&appid=" + APIKEY);

		if (!response.ok || +response.status === 404) {
			throw new Error(
				"There was a problem getting the weather data, please provide a valid location and try again."
			);
		}

		// -- Extract weather data from response
		const weatherData = await response.json();

		// -- Invoke displayWeatherData function using weatherData
		displayWeatherData(weatherData);
	} catch (error) {
		alert(error);
	}
}

function displayWeatherData(data) {
	// Map the weather tags to the corresponding images
	const imageMap = {
		clear: clearImage,
		clouds: cloudsImage,
		drizzle: drizzleImage,
		mist: mistImage,
		rain: rainImage,
		snow: snowImage,
	};

	// Get specific data from function input
	const location = data.name;
	const temperature = data.main.temp;
	const weatherTag = data.weather[0].main;
	const humidity = data.main.humidity;
	const wind = data.wind.speed;
	const weatherImagePath = imageMap[weatherTag.toLowerCase()];

	// Display data to UI
	locationEl.textContent = location;
	temperatureEl.textContent = `${Math.round(temperature)}°C`;
	weatherTagEl.textContent = weatherTag;
	humidityEl.textContent = humidity + "%";
	windEl.textContent = wind + " km/h";
	weatherImgEl.src = weatherImagePath;

	// -- Show results container
	resultsEl.classList.remove("hide-results");
}

// EVENT LISTENER/S
searchBtn.addEventListener("click", () => {
	getWeatherData(inputEl.value);
});
