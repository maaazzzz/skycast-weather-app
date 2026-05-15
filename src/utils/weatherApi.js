// All OpenWeatherMap API calls live here.
// Keeping API logic separate from components makes testing and swapping providers easier.

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// Fetch current weather by city name
export async function fetchWeatherByCity(city) {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  const response = await fetch(url)
  if (!response.ok) {
    if (response.status === 404) throw new Error(`City "${city}" not found.`)
    if (response.status === 401) throw new Error('Invalid API key. Check your .env file.')
    throw new Error('Could not fetch weather. Please try again.')
  }
  return response.json()
}

// Fetch current weather by coordinates (used for geolocation)
export async function fetchWeatherByCoords(lat, lon) {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Could not fetch weather for your location.')
  return response.json()
}

// Fetch 5-day / 3-hour forecast
export async function fetchForecastByCity(city) {
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Could not fetch forecast.')
  return response.json()
}

export async function fetchForecastByCoords(lat, lon) {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Could not fetch forecast.')
  return response.json()
}

// OpenWeatherMap's free forecast returns 40 entries (every 3 hours for 5 days).
// We reduce that to one entry per day (around midday) for clean forecast cards.
export function reduceForecastToDaily(forecastList) {
  const daysMap = new Map()
  forecastList.forEach((entry) => {
    const date = entry.dt_txt.split(' ')[0]
    const hour = entry.dt_txt.split(' ')[1]
    // Prefer the midday reading for each day
    if (!daysMap.has(date) || hour === '12:00:00') {
      daysMap.set(date, entry)
    }
  })
  return Array.from(daysMap.values()).slice(0, 5)
}
