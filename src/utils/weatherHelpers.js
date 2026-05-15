// Maps OpenWeatherMap's "main" weather field to a background gradient and emoji icon.
// Keeping this in one place makes it easy to tweak the look later.

export function getWeatherTheme(condition) {
  const c = (condition || '').toLowerCase()

  if (c.includes('clear')) {
    return {
      gradient: 'linear-gradient(135deg, #FDB813 0%, #FF8C42 50%, #E74C3C 100%)',
      icon: '☀️',
      label: 'sunny',
    }
  }
  if (c.includes('cloud')) {
    return {
      gradient: 'linear-gradient(135deg, #4A6FA5 0%, #6B8CAE 50%, #B0BEC5 100%)',
      icon: '☁️',
      label: 'cloudy',
    }
  }
  if (c.includes('rain') || c.includes('drizzle')) {
    return {
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #4A6572 50%, #708090 100%)',
      icon: '🌧️',
      label: 'rainy',
    }
  }
  if (c.includes('thunder') || c.includes('storm')) {
    return {
      gradient: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #533483 100%)',
      icon: '⛈️',
      label: 'stormy',
    }
  }
  if (c.includes('snow')) {
    return {
      gradient: 'linear-gradient(135deg, #B8C6DB 0%, #E0EAFC 50%, #FFFFFF 100%)',
      icon: '❄️',
      label: 'snowy',
    }
  }
  if (c.includes('mist') || c.includes('fog') || c.includes('haze')) {
    return {
      gradient: 'linear-gradient(135deg, #757F9A 0%, #A6A8AB 50%, #D7DDE8 100%)',
      icon: '🌫️',
      label: 'misty',
    }
  }
  // Sensible default
  return {
    gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
    icon: '🌤️',
    label: 'mild',
  }
}

// Format unix timestamp to short day name (e.g. "Mon")
export function formatDay(unixSeconds) {
  return new Date(unixSeconds * 1000).toLocaleDateString('en-US', { weekday: 'short' })
}

// Celsius to Fahrenheit
export function toFahrenheit(celsius) {
  return Math.round(celsius * 9 / 5 + 32)
}

// Display temperature with chosen unit
export function displayTemp(celsius, unit) {
  if (celsius === undefined || celsius === null) return '—'
  return unit === 'F' ? toFahrenheit(celsius) : Math.round(celsius)
}
