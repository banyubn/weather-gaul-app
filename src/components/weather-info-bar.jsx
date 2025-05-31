"use client"

import { getIconUrl } from "../utils/weather-utils"

// info bar yang muncul di atas map
// nunjukin cuaca current location
export default function WeatherInfoBar({ currentWeather, onDetailClick }) {
  if (!currentWeather) return null

  return (
    <div className={`weather-info-bar ${currentWeather ? "visible" : ""}`}>
      <img
        src={getIconUrl(currentWeather.weather?.[0]?.icon) || "/placeholder.svg"}
        alt={currentWeather.weather?.[0]?.description || "Weather"}
      />
      <div>
        <div className="weather-location">{currentWeather.name || "Unknown"}</div>
        <div className="weather-desc">{currentWeather.weather?.[0]?.description || "No description"}</div>
      </div>
      <div className="weather-temp">{Math.round(currentWeather.main?.temp || 0)}°C</div>
      <button
        onClick={() =>
          currentWeather && onDetailClick(currentWeather.coord?.lat, currentWeather.coord?.lon, currentWeather.name)
        }
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          borderRadius: "8px",
          padding: "8px 12px",
          color: "white",
          fontSize: "12px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        Detail
      </button>
    </div>
  )
}
