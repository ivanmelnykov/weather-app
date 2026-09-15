import { fetchWeather } from "./api.js";


const searchbutton = document.querySelector(".search-button");
const searchinput = document.querySelector("input");
const weatherInfoDiv = document.querySelector(".weather-info");

searchbutton.addEventListener("click", async () => {
  const city = searchinput.value.trim();

  if(!city) return; 

  const data = await fetchWeather(city);

  if(data) {

    const temp = Math.round(data.main.temp);
    const cityName = data.name;

    weatherInfoDiv.innerHTML = `
     <h3>${cityName}</h3>
     <p>${temp}°C</p>
    `;
    } else {
      weatherInfoDiv.innerHTML = `<p> Could not find weather for "${city}".</p>`;

    }
  
});