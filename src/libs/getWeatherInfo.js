export async function getWeatherInfo(lat = "18.5214", lon = "73.8544") {
    const api = import.meta.env.VITE_WEATHER_API_KEY
    console.log("api key", api);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`
    const weather = await fetch(url)
    const res = await weather.json()
    return res
}