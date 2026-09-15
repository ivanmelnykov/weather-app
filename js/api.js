const API_KEY = '778b3059319413934e250574f3d9c2c4';

export async function fetchWeather(city) {
    try {
        const response = await fetch (
           `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}` 
        );

        if(!response.ok) {
            throw new Error(`City not found: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        return null;
      }
}