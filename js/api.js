const API_KEY = '778b3059319413934e250574f3d9c2c4';

const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function fetchCurrent(city) {
    const url = `${CURRENT_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=en`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("The city was not found.")
    }
    return response.json();
}

export async function  fetchForecast(city) {
    const url = `${FORECAST_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=en`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error("Could not get the forecast.");
    }
    return response.json();
    
}