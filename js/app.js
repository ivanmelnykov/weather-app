import { fetchCurrent, fetchForecast } from "./api.js";

const cityInput = document.getElementById("cityInput");
const checkBtn = document.getElementById("checkBtn");
const statusBox = document.getElementById("status");
const currentBox = document.getElementById("currentBox");
const forecastBox = document.getElementById("forecastBox");

checkBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if(!city){
    setStatus("Enter the name of the city",true);
    return;
  }
  setStatus("Getting the data...");
  currentBox.innerHTML= "";
  forecastBox.innerHTML = "";

  try {

    const [currentData, forecastData] = await Promise.all([
      fetchCurrent(city),
      fetchForecast(city)

    ]);
    console.log("Current response: ",currentData);
    console.log("Forecast response: ",forecastData);

    renderCurrent(currentData);
    renderForecast(forecastData);
    setStatus("Ready ");
  }
  catch (error) {
    setStatus(error.message,true);
  }
});

function renderCurrent(d) {
  const timeStr = formatDateTime(d.dt * 1000);
  const icon = d.weather?.[0]?.icon;
  const desc = d.weather?.[0]?.description ?? "-";

  currentBox.innerHTML = `
    <div class="block-title">Current Weather — ${d.name}, ${d.sys?.country ?? ""}</div>
    <article class="card glass">
      <div class="icon-wrap">
        ${icon ? `<img alt="${desc}" src="https://openweathermap.org/img/wn/${icon}@2x.png" />` : ""}
      </div>
      <div class="meta">
        <div class="time">${timeStr}</div>
        <div class="desc">${desc}</div>
      </div>
      <div class="temp">
        <div class="main">${round(d.main?.temp)}°C</div>
        <div class="feels">Feels like: ${round(d.main?.feels_like)}°C</div>
      </div>
    </article>
  `;
}

function renderForecast(d) {
  const list = d.list.filter((_, i) => i % 2 === 0);

  const cards = list.map(item => {
   const timeStr = formatDateTime(item.dt * 1000);
   const icon = item.weather?.[0]?.icon;
   const desc = item.weather?.[0]?.description ?? "-";

   return `
      <article class="card glass">
        <div class="icon-wrap">
          ${icon ? `<img alt="${desc}" src="https://openweathermap.org/img/wn/${icon}@2x.png" />` : ""}
        </div>
        <div class="meta">
          <div class="time">${timeStr}</div>
          <div class="desc">${desc}</div>
        </div>
        <div class="temp">
          <div class="main">${round(item.main?.temp)}°C</div>
          <div class="feels">Feels like: ${round(item.main?.feels_like)}°C</div>
        </div>
      </article>
    `;
  }).join("");

  forecastBox.innerHTML = `
    <div class="block-title">5-day forecast </div>
    ${cards || `<div class="error">No forecast data available.</div>`}
  `;
}

function setStatus(msg, isError = false) {
  statusBox.textContent = msg;
  statusBox.className = "status" + (isError ? " error" : "");

}

function round(x) {
  return (typeof x === "number") ? x.toFixed(1) : "-";

}

function formatDateTime(ms) {
  const dt = new Date(ms);
  return dt.toLocaleString("en-EN", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit"
  });
}


