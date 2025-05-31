"use client"

import { XIcon, ThermometerIcon, WindIcon, DropletsIcon, EyeIcon, AlertTriangleIcon } from "./icons"
import { getIconUrl, formatDay, formatHour, getDailyForecast, getHourlyForecast } from "../utils/weather-utils"

// modal buat nampilin detail cuaca
// ada forecast 5 hari sama per jam
export default function WeatherModal({ modalOpen, modalData, forecast, onClose }) {
  if (!modalOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      {modalData?.error ? (
        // kalo ada error
        <div className="error-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="error-icon">
            <AlertTriangleIcon />
          </div>
          <h2 className="error-title">Cuaca Tidak Ditemukan</h2>
          <p className="error-message">{modalData.error}</p>
          <button onClick={onClose} className="error-button">
            Tutup
          </button>
        </div>
      ) : modalData?.weatherData ? (
        // kalo berhasil dapet data
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="modal-close">
            <XIcon />
          </button>

          <div className="modal-header">
            <div className="modal-weather-main">
              <img
                src={getIconUrl(modalData.weatherData.weather?.[0]?.icon) || "/placeholder.svg"}
                alt={modalData.weatherData.weather?.[0]?.description || "Weather"}
                className="modal-weather-icon"
              />
              <div className="modal-weather-info">
                <h2>{modalData.weatherData.name || "Unknown Location"}</h2>
                <p>{modalData.weatherData.weather?.[0]?.description || "No description"}</p>
                <div className="modal-temp">{Math.round(modalData.weatherData.main?.temp || 0)}°C</div>
                <div className="modal-feels-like">
                  Terasa seperti {Math.round(modalData.weatherData.main?.feels_like || 0)}°C
                </div>
              </div>
            </div>
          </div>

          {/* stats cuaca */}
          <div className="modal-stats">
            <div className="modal-stat-item">
              <div className="modal-stat-icon">
                <ThermometerIcon />
              </div>
              <div className="modal-stat-label">Min/Max</div>
              <div className="modal-stat-value">
                {Math.round(modalData.weatherData.main?.temp_min || 0)}° /{" "}
                {Math.round(modalData.weatherData.main?.temp_max || 0)}°
              </div>
            </div>

            <div className="modal-stat-item">
              <div className="modal-stat-icon">
                <WindIcon />
              </div>
              <div className="modal-stat-label">Angin</div>
              <div className="modal-stat-value">{modalData.weatherData.wind?.speed || 0} m/s</div>
            </div>

            <div className="modal-stat-item">
              <div className="modal-stat-icon">
                <DropletsIcon />
              </div>
              <div className="modal-stat-label">Kelembapan</div>
              <div className="modal-stat-value">{modalData.weatherData.main?.humidity || 0}%</div>
            </div>

            <div className="modal-stat-item">
              <div className="modal-stat-icon">
                <EyeIcon />
              </div>
              <div className="modal-stat-label">Visibilitas</div>
              <div className="modal-stat-value">{((modalData.weatherData.visibility || 0) / 1000).toFixed(1)} km</div>
            </div>
          </div>

          {/* forecast kalo ada */}
          {forecast && forecast.list && (
            <div className="modal-forecast">
              <h3 className="modal-forecast-title">Prakiraan 5 Hari</h3>
              <div className="modal-forecast-grid">
                {getDailyForecast(forecast).map((item, index) => (
                  <div key={index} className="modal-forecast-item">
                    <div className="modal-forecast-day">{formatDay(item.dt)}</div>
                    <img
                      src={getIconUrl(item.weather?.[0]?.icon) || "/placeholder.svg"}
                      alt={item.weather?.[0]?.description || "Weather"}
                      className="modal-forecast-icon"
                    />
                    <div className="modal-forecast-temp">{Math.round(item.main?.temp || 0)}°C</div>
                    <div className="modal-forecast-desc">{item.weather?.[0]?.description || "N/A"}</div>
                  </div>
                ))}
              </div>

              <h3 className="modal-forecast-title">Prakiraan 24 Jam</h3>
              <div className="modal-hourly">
                <div className="modal-hourly-grid">
                  {getHourlyForecast(forecast).map((item, index) => (
                    <div key={index} className="modal-hourly-item">
                      <div className="modal-hourly-time">{formatHour(item.dt)}</div>
                      <img
                        src={getIconUrl(item.weather?.[0]?.icon) || "/placeholder.svg"}
                        alt={item.weather?.[0]?.description || "Weather"}
                        className="modal-hourly-icon"
                      />
                      <div className="modal-hourly-temp">{Math.round(item.main?.temp || 0)}°C</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // loading state
        <div className="error-modal-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ padding: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                border: "3px solid #e2e8f0",
                borderTop: "3px solid #667eea",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}
