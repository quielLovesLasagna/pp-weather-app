"use strict";

import clearImage from "../../images/clear.png";
import cloudsImage from "../../images/clouds.png";
import drizzleImage from "../../images/drizzle.png";
import mistImage from "../../images/mist.png";
import rainImage from "../../images/rain.png";
import snowImage from "../../images/snow.png";

// API/S
const WEATHER_API_KEY = "a707d9b2c96a826ef5f94abfef56ed9e";
const WEATHER_API_URL =
	"https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const FLAG_API_URL = "https://restcountries.com/v3.1/name/";

// ELEMENT/S
const inputEl = document.querySelector(".card__input");
const searchBtn = document.querySelector(".card__button");
const resultsEl = document.querySelector(".weather");
const locationEl = document.querySelector(".weather__location");
const flagEl = document.querySelector(".weather__flag");
const temperatureEl = document.querySelector(".weather__temperature");
const weatherImgEl = document.querySelector(".weather__image");
const weatherTagEl = document.querySelector(".weather__tag");
const humidityEl = document.querySelector(".weather__humidity");
const windEl = document.querySelector(".weather__wind");

// FUNCTION/S
async function isValidCountry(countryName) {
	try {
		const response = await fetch(FLAG_API_URL + countryName);
		const data = await response.json();

		// -- Check if the flag API returned valid data for the given country
		return response.ok && data.length > 0;
	} catch (error) {
		return false;
	}
}

async function getData(location) {
	try {
		if (await isValidCountry(location)) {
			// -- Request weather and flag data
			const weatherRes = await fetch(
				WEATHER_API_URL + location + "&appid=" + WEATHER_API_KEY
			);
			const flagRes = await fetch(FLAG_API_URL + location);

			// -- Extract weather and flag data from response
			const weatherData = await weatherRes.json();
			const flagData = await flagRes.json();

			// -- Invoke displayResults function using weatherData
			displayResults(weatherData, flagData);
		} else {
			throw new Error("Invalid country. Please enter a valid country name.");
		}
	} catch (error) {
		alert(error);
	}
}

function displayResults(weatherData, flagData) {
	// -- Map the weather tags to the corresponding images
	const imageMap = {
		clear: clearImage,
		clouds: cloudsImage,
		drizzle: drizzleImage,
		mist: mistImage,
		rain: rainImage,
		snow: snowImage,
	};

	// -- Get specific weather and flag data from function input
	const location = weatherData.name;
	const flag = flagData[0].flags.png;
	const temperature = weatherData.main.temp;
	const weatherTag = weatherData.weather[0].main;
	const humidity = weatherData.main.humidity;
	const wind = weatherData.wind.speed;
	const weatherImagePath = imageMap[weatherTag.toLowerCase()];

	// -- Display data to UI
	locationEl.textContent = location;
	flagEl.src = flag;
	temperatureEl.textContent = `${Math.round(temperature)}°C`;
	weatherTagEl.textContent = weatherTag;
	humidityEl.textContent = humidity + "%";
	windEl.textContent = wind + " km/h";
	weatherImgEl.src = weatherImagePath;

	// -- Show results container
	resultsEl.classList.remove("hide-results");
}

// EVENT LISTENER/S
inputEl.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		getData(inputEl.value.trim());
	}
});

searchBtn.addEventListener("click", () => {
	getData(inputEl.value.trim());
});
