import { fetchWeather, fetchForecast } from "./api.js";


const searchbutton = document.querySelector(".search-button");
const searchinput = document.querySelector("input");
const currentWeatherDiv = document.querySelector(".weather-info");
const forecastContainer = document.querySelector(".forecast-container");

searchbutton.addEventListener("click", async () => {
  const city = searchinput.value.trim();

  if(!city) return; 

  const currentData = await fetchWeather(city);
  const forecastData = await fetchForecast(city);

  if(currentData) {

    const temp = Math.round(currentData.main.temp);
    const description = currentData.weather[0].description;

    currentWeatherDiv.innerHTML = `
    <h3> Current Weather - ${currentData.name} , ${currentData.sys.country} </h3>
    <p>${temp}°C — ${description} </p>
    `;
  } else {
    currentWeatherDiv.innerHTML = `<p> Weather not found for "${city}"<p>`;
  }

  if (forecastData && forecastData.list) {
    forecastContainer.innerHTML = "";

    // Looping through a slice of the list (first 5 entries to match a clean stack view)
    forecastData.list.slice(0,5).forEach(item => {
      const forecastTemp = Math.round(item.main.temp);
      const forecastTime = item.dt_txt;
      const description = item.weather[0].description;

      const row = document.createElement("div");
      row.classList.add("forecast-row");
      row.innerHTML = `
      <span> ${forecastTime}</span>
      <span> ${forecastTemp}</span>
      <span> ${description} </span>`;
      forecastContainer.appendChild(row);
    });
  }
  
});