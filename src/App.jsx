import { useState, useEffect, useCallback } from 'react'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import RecentSearches from './components/RecentSearches'
import { LoadingState, ErrorState, EmptyState } from './components/States'
import { useLocalStorage } from './hooks/useLocalStorage'
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  fetchForecastByCity,
  fetchForecastByCoords,
  reduceForecastToDaily,
} from './utils/weatherApi'
import { getWeatherTheme } from './utils/weatherHelpers'

const MAX_RECENT = 5

export default function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [unit, setUnit] = useLocalStorage('weather-unit', 'C')
  const [recent, setRecent] = useLocalStorage('weather-recent', [])

  // Update recent searches list (most recent first, no duplicates, capped)
  const addToRecent = useCallback((cityName) => {
    setRecent((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== cityName.toLowerCase())
      return [cityName, ...filtered].slice(0, MAX_RECENT)
    })
  }, [setRecent])

  // Search by city name — fetches both current and forecast in parallel
  const handleSearch = useCallback(async (city) => {
    setLoading(true)
    setError(null)
    try {
      const [currentData, forecastData] = await Promise.all([
        fetchWeatherByCity(city),
        fetchForecastByCity(city),
      ])
      setWeather(currentData)
      setForecast(reduceForecastToDaily(forecastData.list))
      addToRecent(currentData.name)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [addToRecent])

  // Use browser geolocation API
  const handleLocate = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser.')
      return
    }
    setLoading(true)
    setError(null)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const [currentData, forecastData] = await Promise.all([
            fetchWeatherByCoords(latitude, longitude),
            fetchForecastByCoords(latitude, longitude),
          ])
          setWeather(currentData)
          setForecast(reduceForecastToDaily(forecastData.list))
          addToRecent(currentData.name)
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      },
      (err) => {
        setLoading(false)
        setError('Could not get your location. Please allow location access or search manually.')
      },
      { timeout: 10000 }
    )
  }, [addToRecent])

  const toggleUnit = () => setUnit((u) => (u === 'C' ? 'F' : 'C'))

  // Auto-load last searched city or geolocation on first mount
  useEffect(() => {
    if (recent.length > 0) {
      handleSearch(recent[0])
    } else {
      handleLocate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Dynamic background based on current weather
  const theme = weather ? getWeatherTheme(weather.weather[0].main) : null
  const backgroundStyle = theme
    ? { background: theme.gradient }
    : { background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' }

  return (
    <div className="app" style={backgroundStyle}>
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Skycast</h1>
          <p className="app-tagline">Weather, beautifully simple</p>
        </header>

        <SearchBar
          onSearch={handleSearch}
          onLocate={handleLocate}
          unit={unit}
          onToggleUnit={toggleUnit}
        />

        <RecentSearches
          cities={recent}
          onSelect={handleSearch}
          onClear={() => setRecent([])}
        />

        <main className="app-main">
          {loading && <LoadingState />}
          {!loading && error && <ErrorState message={error} onRetry={() => weather && handleSearch(weather.name)} />}
          {!loading && !error && !weather && <EmptyState />}
          {!loading && !error && weather && (
            <>
              <CurrentWeather data={weather} unit={unit} />
              <Forecast days={forecast} unit={unit} />
            </>
          )}
        </main>

        <footer className="app-footer">
          <p>Data by <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a></p>
        </footer>
      </div>
    </div>
  )
}
