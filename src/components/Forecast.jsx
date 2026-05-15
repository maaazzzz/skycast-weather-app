import { displayTemp, getWeatherTheme, formatDay } from '../utils/weatherHelpers'

export default function Forecast({ days, unit }) {
  if (!days || days.length === 0) return null

  return (
    <div className="forecast-section">
      <h3 className="section-title">5-day forecast</h3>
      <div className="forecast-grid">
        {days.map((day) => {
          const theme = getWeatherTheme(day.weather[0].main)
          return (
            <div key={day.dt} className="glass-card forecast-card">
              <p className="forecast-day">{formatDay(day.dt)}</p>
              <div className="forecast-icon" aria-hidden="true">{theme.icon}</div>
              <p className="forecast-condition">{day.weather[0].main}</p>
              <div className="forecast-temps">
                <span className="temp-high">{displayTemp(day.main.temp_max, unit)}°</span>
                <span className="temp-low">{displayTemp(day.main.temp_min, unit)}°</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
