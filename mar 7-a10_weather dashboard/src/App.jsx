import { useState } from 'react'
import './App.css'

const QUICK_CITIES = ['Bangalore', 'Chennai', 'Kolkata', 'Tokyo']

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

function weatherEmoji(code) {
  if (code === 0) return '☀️'
  if (code <= 3) return '🌤'
  if (code <= 48) return '🌫️'
  if (code <= 57) return '🌧️'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '❄️'
  if (code <= 82) return '🌧️'
  if (code <= 86) return '❄️'
  if (code <= 99) return '⛈'
  return '🌡️'
}

function weatherLabel(code) {
  if (code === 0) return 'Clear Sky'
  if (code <= 3) return 'Partly Cloudy'
  if (code <= 48) return 'Fog'
  if (code <= 57) return 'Drizzle'
  if (code <= 67) return 'Rain'
  if (code <= 77) return 'Snow'
  if (code <= 82) return 'Rain Showers'
  if (code <= 86) return 'Snow Showers'
  if (code <= 99) return 'Thunderstorm'
  return 'Unknown'
}

function App() {
  const [query, setQuery] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function fetchWeather(cityName) {
    setLoading(true)
    setErrorMsg('')
    setWeatherData(null)

    try {
      const geoRes = await fetch(`${GEOCODE_URL}?name=${encodeURIComponent(cityName)}&count=1`)
      const geoJson = await geoRes.json()

      if (!geoJson.results || geoJson.results.length === 0) {
        setErrorMsg(`City "${cityName}" not found. Try another name.`)
        setLoading(false)
        return
      }

      const { latitude, longitude, name, country } = geoJson.results[0]

      const weatherRes = await fetch(
        `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m&timezone=auto`
      )
      const weatherJson = await weatherRes.json()
      const current = weatherJson.current_weather

      const humidityNow = weatherJson.hourly?.relative_humidity_2m?.[0] ?? '--'

      setWeatherData({
        city: name,
        country,
        temperature: current.temperature,
        windspeed: current.windspeed,
        weathercode: current.weathercode,
        humidity: humidityNow,
        winddirection: current.winddirection,
      })
    } catch (err) {
      setErrorMsg('Failed to fetch weather data. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      fetchWeather(query.trim())
    }
  }

  function handleQuickCity(city) {
    setQuery(city)
    fetchWeather(city)
  }

  return (
    <div className="app-container">
      <h1 className="app-title">WeatherNow</h1>
      <p className="app-subtitle">Real-time weather at your fingertips</p>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      <div className="quick-cities">
        {QUICK_CITIES.map((city) => (
          <button
            key={city}
            className="quick-btn"
            onClick={() => handleQuickCity(city)}
          >
            {city}
          </button>
        ))}
      </div>

      {loading && <div className="status-msg">Loading weather data...</div>}
      {errorMsg && <div className="status-msg error">{errorMsg}</div>}

      {weatherData && (
        <div className="weather-card">
          <div className="weather-header">
            <span className="weather-emoji">{weatherEmoji(weatherData.weathercode)}</span>
            <div>
              <h2 className="city-name">{weatherData.city}, {weatherData.country}</h2>
              <p className="weather-desc">{weatherLabel(weatherData.weathercode)}</p>
            </div>
          </div>

          <div className="temp-display">{weatherData.temperature}°C</div>

          <div className="details-grid">
            <div className="detail-card" style={{ borderLeftColor: '#14b8a6' }}>
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{weatherData.humidity}%</span>
            </div>
            <div className="detail-card" style={{ borderLeftColor: '#f59e0b' }}>
              <span className="detail-label">Wind Speed</span>
              <span className="detail-value">{weatherData.windspeed} km/h</span>
            </div>
            <div className="detail-card" style={{ borderLeftColor: '#8b5cf6' }}>
              <span className="detail-label">Wind Dir</span>
              <span className="detail-value">{weatherData.winddirection}°</span>
            </div>
            <div className="detail-card" style={{ borderLeftColor: '#ef4444' }}>
              <span className="detail-label">Condition</span>
              <span className="detail-value">{weatherLabel(weatherData.weathercode)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
