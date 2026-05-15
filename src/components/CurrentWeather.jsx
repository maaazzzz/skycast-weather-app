import { displayTemp, getWeatherTheme } from '../utils/weatherHelpers'

export default function CurrentWeather({ data, unit }) {
  if (!data) return null

  const theme = getWeatherTheme(data.weather[0].main)
  const u = '°' + unit

  return (
    <div className="glass-card current-weather">
      <div className="current-header">
        <div>
          <h2 className="city-name">{data.name}{data.sys?.country ? `, ${data.sys.country}` : ''}</h2>
          <p className="condition-label">{data.weather[0].description}</p>
        </div>
        <div className="weather-emoji" aria-hidden="true">{theme.icon}</div>
      </div>

      <div className="temp-display">
        <span className="temp-main">{displayTemp(data.main.temp, unit)}{u}</span>
        <span className="temp-feels">Feels like {displayTemp(data.main.feels_like, unit)}{u}</span>
      </div>

      <div className="stats-grid">
        <div className="stat">
          <span className="stat-label">💧 Humidity</span>
          <span className="stat-value">{data.main.humidity}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">💨 Wind</span>
          <span className="stat-value">{Math.round(data.wind.speed * 3.6)} km/h</span>
        </div>
        <div className="stat">
          <span className="stat-label">🌡️ Pressure</span>
          <span className="stat-value">{data.main.pressure} hPa</span>
        </div>
        <div className="stat">
          <span className="stat-label">👁️ Visibility</span>
          <span className="stat-value">{(data.visibility / 1000).toFixed(1)} km</span>
        </div>
      </div>
    </div>
  )
}
