# 🌤️ Skycast — Weather App

A modern weather app built with React, featuring a glassmorphism UI, real-time data from OpenWeatherMap, geolocation, and persistent recent searches.

[**Live Demo →**](#) <!-- Add your Vercel/Netlify URL here after deployment -->

![Skycast screenshot](#) <!-- Optional: add a screenshot later -->

---

## ✨ Features

- 🔍 **City search** with real-time weather data
- 📍 **Auto-detect location** via the browser Geolocation API
- 🌡️ **Current weather** — temperature, humidity, wind, pressure, visibility, "feels like"
- 📅 **5-day forecast** with daily high/low and conditions
- 🎨 **Dynamic backgrounds** that change with the weather (sunny, rainy, snowy, etc.)
- 🕒 **Recent searches** saved to localStorage
- 🔄 **°C / °F toggle** with persistent preference
- ⏳ **Loading and error states** with retry support
- 📱 **Fully responsive** — works beautifully on mobile and desktop
- 🪟 **Glassmorphism design** with frosted-glass cards and animated gradients

---

## 🛠️ Tech Stack

- **React 18** — UI library with hooks
- **Vite** — fast development server and bundler
- **OpenWeatherMap API** — weather data source
- **Vanilla CSS** — custom glassmorphism styling (no framework needed)
- **localStorage** — client-side persistence
- **Geolocation API** — native browser location

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A free OpenWeatherMap API key — [get one here](https://home.openweathermap.org/users/sign_up)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/skycast-weather-app.git
   cd skycast-weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key**
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and paste your OpenWeatherMap API key:
   ```
   VITE_OPENWEATHER_API_KEY=your_actual_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
skycast-weather-app/
├── public/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx        # City search + location + unit toggle
│   │   ├── CurrentWeather.jsx   # Main weather display card
│   │   ├── Forecast.jsx         # 5-day forecast grid
│   │   ├── RecentSearches.jsx   # Pills for recent cities
│   │   └── States.jsx           # Loading, error, and empty states
│   ├── hooks/
│   │   └── useLocalStorage.js   # Custom hook for persistent state
│   ├── utils/
│   │   ├── weatherApi.js        # All OpenWeatherMap API calls
│   │   └── weatherHelpers.js    # Theme mapping, unit conversion
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── styles.css               # Global styles + glassmorphism
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🏗️ Architecture Decisions

- **Separation of concerns** — API calls, helpers, and UI components live in separate folders so each piece can be tested and replaced independently.
- **Custom `useLocalStorage` hook** — abstracts localStorage syncing so any component can persist state with a one-liner.
- **Parallel API calls** — current weather and forecast are fetched with `Promise.all` to minimize wait time.
- **Single source of truth** — App.jsx holds all shared state; child components are presentational and receive data via props.
- **Theme as data, not logic** — `getWeatherTheme()` returns the gradient and icon for any condition, keeping styling decisions out of components.

---

## 🚢 Deployment

This app is deployable to any static host. Recommended: **Vercel** or **Netlify**.

### Deploy to Vercel

1. Push the repo to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add your `VITE_OPENWEATHER_API_KEY` as an environment variable
4. Click Deploy — done in ~30 seconds

---

## 📝 License

MIT — feel free to use this project as a learning reference or portfolio piece.

---

## 🙏 Credits

- Weather data: [OpenWeatherMap](https://openweathermap.org)
- Inspiration: countless dribbble glassmorphism explorations
