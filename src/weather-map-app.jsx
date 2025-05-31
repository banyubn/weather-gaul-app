"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// import komponen-komponen yang udah dipisah
import SearchBar from "./components/search-bar"
import WeatherInfoBar from "./components/weather-info-bar"
import WeatherModal from "./components/weather-modal"
import Footer from "./components/footer"
import { weatherStyles } from "./styles/weather-styles"
import { OPENWEATHER_API_KEY, isValidCoordinate, getErrorMessage } from "./utils/weather-utils"

// komponen utama weather map app
// udah dipecah jadi lebih rapi dan gampang di-maintain
export default function WeatherMapApp() {
  const mapRef = useRef(null)
  const popupRef = useRef(null)

  // state buat nyimpen data-data penting
  const [inputCity, setInputCity] = useState("")
  const [modalData, setModalData] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [forecast, setForecast] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    // setup font sama styles
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    const style = document.createElement("style")
    style.textContent = weatherStyles
    document.head.appendChild(style)

    // inisialisasi map leaflet
    mapRef.current = L.map("map").setView([-6.2088, 106.8456], 10) // default jakarta

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(mapRef.current)

    popupRef.current = L.popup()

    // event handler kalo map diklik
    mapRef.current.on("click", (e) => {
      try {
        const { lat, lng } = e.latlng

        console.log("Map diklik di koordinat:", { lat, lng })

        // validasi koordinat dulu sebelum ambil cuaca
        if (!isValidCoordinate(lat, lng)) {
          console.warn("Koordinat ga valid:", { lat, lng })

          popupRef.current
            .setLatLng([lat, lng])
            .setContent(`
            <div class="map-popup-error">
              <p>Koordinat tidak valid. Coba klik di tempat lain.</p>
            </div>
          `)
            .openOn(mapRef.current)
          return
        }

        fetchWeatherByCoordinates(lat, lng, true)
      } catch (error) {
        console.error("Error pas handle map click:", error)

        if (popupRef.current && e && e.latlng) {
          popupRef.current
            .setLatLng(e.latlng)
            .setContent(`
            <div class="map-popup-error">
              <p>Ada error nih. Coba lagi ya.</p>
            </div>
          `)
            .openOn(mapRef.current)
        }
      }
    })

    // load cuaca jakarta pas pertama kali
    try {
      fetchWeatherByCoordinates(-6.2088, 106.8456, false)
    } catch (error) {
      console.error("Error loading cuaca awal:", error)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
      document.head.removeChild(link)
      document.head.removeChild(style)
    }
  }, [])

  // fungsi buat geocoding (nama kota jadi koordinat)
  const geocodeCity = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=5&appid=${OPENWEATHER_API_KEY}`,
      )

      if (!response.ok) {
        const errorMessage = getErrorMessage(response.status, "Gagal cari lokasi")
        throw new Error(errorMessage)
      }

      const data = await response.json()
      return data || []
    } catch (error) {
      console.error("Geocoding error:", error)
      throw error
    }
  }

  // ambil data cuaca berdasarkan koordinat
  const fetchWeatherByCoordinates = async (lat, lon, showPopup = false) => {
    try {
      // konversi ke number kalo masih string
      const numLat = typeof lat === "string" ? Number.parseFloat(lat) : lat
      const numLon = typeof lon === "string" ? Number.parseFloat(lon) : lon

      console.log("Ambil cuaca untuk koordinat:", { numLat, numLon })

      // validasi koordinat dulu
      if (!isValidCoordinate(numLat, numLon)) {
        const errorMessage = "Koordinat ga valid. Pilih lokasi lain."
        console.error("Koordinat invalid:", { numLat, numLon })

        if (showPopup && popupRef.current) {
          popupRef.current
            .setLatLng([numLat || 0, numLon || 0])
            .setContent(`
            <div class="map-popup-error">
              <p>${errorMessage}</p>
            </div>
          `)
            .openOn(mapRef.current)
        }
        throw new Error(errorMessage)
      }

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${numLat}&lon=${numLon}&appid=${OPENWEATHER_API_KEY}&units=metric`

      if (showPopup && popupRef.current) {
        popupRef.current
          .setLatLng([numLat, numLon])
          .setContent(`
          <div class="map-popup-loading">
            <div class="map-popup-spinner"></div>
            <p>Lagi ambil data cuaca...</p>
          </div>
        `)
          .openOn(mapRef.current)
      }

      const response = await fetch(weatherUrl)

      if (!response.ok) {
        const errorMessage = getErrorMessage(response.status, "Cuaca ga ketemu")
        console.error(`Weather API error: ${response.status} - ${response.statusText}`)

        if (showPopup && popupRef.current) {
          popupRef.current.setContent(`
          <div class="map-popup-error">
            <p>${errorMessage}</p>
          </div>
        `)
        }

        throw new Error(errorMessage)
      }

      const data = await response.json()

      // validasi data response
      if (!data || !data.weather || !Array.isArray(data.weather) || data.weather.length === 0 || !data.main) {
        const errorMessage = "Data cuaca ga valid atau ga lengkap"

        if (showPopup && popupRef.current) {
          popupRef.current.setContent(`
          <div class="map-popup-error">
            <p>${errorMessage}</p>
          </div>
        `)
        }

        throw new Error(errorMessage)
      }

      if (showPopup && popupRef.current) {
        showWeatherPopup(data)
      } else if (mapRef.current) {
        setCurrentWeather(data)
        mapRef.current.setView([numLat, numLon], 10)
      }

      return data
    } catch (error) {
      console.error("Weather fetch error:", error)

      if (showPopup && popupRef.current) {
        try {
          popupRef.current.setContent(`
          <div class="map-popup-error">
            <p>${error.message || "Cuaca ga ketemu buat lokasi ini"}</p>
          </div>
        `)
        } catch (popupError) {
          console.error("Error setting popup content:", popupError)
        }
      }
      throw error
    }
  }

  // tampilin popup cuaca di map
  const showWeatherPopup = (data) => {
    try {
      const weather = data.weather[0]
      const iconUrl = `http://openweathermap.org/img/wn/${weather.icon}@4x.png`

      // hitung persentase buat progress bar
      const humidityPercent = Math.min(Math.max(data.main.humidity || 0, 0), 100)
      const visibilityPercent = Math.min(((data.visibility || 0) / 10000) * 100, 100)
      const pressurePercent = Math.min((((data.main.pressure || 1013) - 950) / (1050 - 950)) * 100, 100)
      const windPercent = Math.min(((data.wind?.speed || 0) / 20) * 100, 100)

      const content = `
        <div class="map-popup-content">
          <div class="map-popup-header">
            <img src="${iconUrl}" alt="${weather.description}" class="map-popup-icon" />
            <div class="map-popup-title-section">
              <h3 class="map-popup-city">${data.name || "Lokasi ga dikenal"}</h3>
              <p class="map-popup-desc">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                </svg>
                ${weather.description || "Ga ada deskripsi"}
              </p>
            </div>
          </div>
          
          <div class="map-popup-temp-section">
            <div class="map-popup-temp">${Math.round(data.main.temp || 0)}°C</div>
            <div class="map-popup-feels-like">Terasa seperti ${Math.round(data.main.feels_like || 0)}°C</div>
            
            <div class="map-popup-details">
              <div class="map-popup-detail-item">
                <svg class="map-popup-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5,12 12,5 19,12"></polyline>
                </svg>
                <div class="map-popup-detail-label">Maksimal</div>
                <div class="map-popup-detail-value">${Math.round(data.main.temp_max || 0)}°C</div>
              </div>
              
              <div class="map-popup-detail-item">
                <svg class="map-popup-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19,12 12,19 5,12"></polyline>
                </svg>
                <div class="map-popup-detail-label">Minimal</div>
                <div class="map-popup-detail-value">${Math.round(data.main.temp_min || 0)}°C</div>
              </div>
              
              <div class="map-popup-detail-item">
                <svg class="map-popup-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
                </svg>
                <div class="map-popup-detail-label">Angin</div>
                <div class="map-popup-detail-value">${data.wind?.speed || 0} m/s</div>
              </div>
              
              <div class="map-popup-detail-item">
                <svg class="map-popup-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
                <div class="map-popup-detail-label">Kelembapan</div>
                <div class="map-popup-detail-value">${data.main.humidity || 0}%</div>
              </div>
            </div>
          </div>
          
          <div class="map-popup-progress-section">
            <div class="map-popup-progress-item">
              <div class="map-popup-progress-label">
                <span>Kelembapan</span>
                <span>${data.main.humidity || 0}%</span>
              </div>
              <div class="map-popup-progress-bar">
                <div class="map-popup-progress-fill humidity-fill" style="width: ${humidityPercent}%"></div>
              </div>
            </div>
            
            <div class="map-popup-progress-item">
              <div class="map-popup-progress-label">
                <span>Visibilitas</span>
                <span>${((data.visibility || 0) / 1000).toFixed(1)} km</span>
              </div>
              <div class="map-popup-progress-bar">
                <div class="map-popup-progress-fill visibility-fill" style="width: ${visibilityPercent}%"></div>
              </div>
            </div>
            
            <div class="map-popup-progress-item">
              <div class="map-popup-progress-label">
                <span>Tekanan</span>
                <span>${data.main.pressure || 0} hPa</span>
              </div>
              <div class="map-popup-progress-bar">
                <div class="map-popup-progress-fill pressure-fill" style="width: ${pressurePercent}%"></div>
              </div>
            </div>
            
            <div class="map-popup-progress-item">
              <div class="map-popup-progress-label">
                <span>Kecepatan Angin</span>
                <span>${data.wind?.speed || 0} m/s</span>
              </div>
              <div class="map-popup-progress-bar">
                <div class="map-popup-progress-fill wind-fill" style="width: ${windPercent}%"></div>
              </div>
            </div>
          </div>
          
          <div class="map-popup-footer">
            <p class="map-popup-footer-text">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
              Diperbarui: ${new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </div>
      `
      popupRef.current.setContent(content)
    } catch (error) {
      console.error("Error nampilin weather popup:", error)
      popupRef.current.setContent(`
        <div class="map-popup-error">
          <p>Ada error pas nampilin data cuaca</p>
        </div>
      `)
    }
  }

  // ambil data cuaca detail buat modal
  const fetchDetailedWeather = async (lat, lon, cityName) => {
    // validasi koordinat dulu
    if (!isValidCoordinate(lat, lon)) {
      setModalData({
        city: cityName,
        weatherData: null,
        error: "Koordinat ga valid buat lokasi ini",
      })
      setModalOpen(true)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setModalData({ city: cityName, weatherData: null, error: null })

    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`

      const [weatherResponse, forecastResponse] = await Promise.all([fetch(weatherUrl), fetch(forecastUrl)])

      if (!weatherResponse.ok) {
        const errorMessage = getErrorMessage(weatherResponse.status, "Gagal ambil data cuaca")
        throw new Error(errorMessage)
      }

      if (!forecastResponse.ok) {
        console.warn("Forecast data ga ada, lanjut pake current weather aja")
      }

      const weatherData = await weatherResponse.json()
      const forecastData = forecastResponse.ok ? await forecastResponse.json() : null

      // validasi data cuaca
      if (!weatherData || !weatherData.weather || !weatherData.main) {
        throw new Error("Data cuaca ga valid atau ga lengkap")
      }

      setModalData({ city: cityName, weatherData, error: null })
      setForecast(forecastData)
      setModalOpen(true)
      setCurrentWeather(weatherData)

      // update view map
      mapRef.current.setView([lat, lon], 12)
    } catch (error) {
      console.error("Detailed weather fetch error:", error)
      setModalData({
        city: cityName,
        weatherData: null,
        error: error.message || "Cuaca ga ketemu buat lokasi ini",
      })
      setModalOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  // handle search form submit
  const handleSearch = async (e) => {
    e.preventDefault()
    if (!inputCity.trim()) return

    setIsLoading(true)

    try {
      const locations = await geocodeCity(inputCity.trim())
      if (locations && locations.length > 0) {
        const location = locations[0]
        await fetchDetailedWeather(location.lat, location.lon, location.name)
        setInputCity("")
        setShowSuggestions(false)
      } else {
        setModalData({
          city: inputCity.trim(),
          weatherData: null,
          error: "Lokasi ga ketemu. Coba nama kota yang lain.",
        })
        setModalOpen(true)
      }
    } catch (error) {
      console.error("Search error:", error)
      setModalData({
        city: inputCity.trim(),
        weatherData: null,
        error: error.message || "Ada error pas cari lokasi. Coba lagi.",
      })
      setModalOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  // handle input change buat suggestions
  const handleInputChange = async (e) => {
    const value = e.target.value
    setInputCity(value)

    if (value.length > 2) {
      try {
        const locations = await geocodeCity(value)
        if (locations && Array.isArray(locations)) {
          setSearchSuggestions(locations.slice(0, 5))
          setShowSuggestions(true)
        } else {
          setSearchSuggestions([])
          setShowSuggestions(false)
        }
      } catch (error) {
        console.error("Input change error:", error)
        setSearchSuggestions([])
        setShowSuggestions(false)
      }
    } else {
      setSearchSuggestions([])
      setShowSuggestions(false)
    }
  }

  // handle klik suggestion
  const handleSuggestionClick = async (location) => {
    setInputCity("")
    setShowSuggestions(false)
    try {
      await fetchDetailedWeather(location.lat, location.lon, location.name)
    } catch (error) {
      console.error("Suggestion click error:", error)
    }
  }

  // tutup modal
  const closeModal = () => {
    setModalOpen(false)
    setModalData(null)
    setForecast(null)
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* search bar */}
      <SearchBar
        inputCity={inputCity}
        setInputCity={setInputCity}
        isLoading={isLoading}
        searchSuggestions={searchSuggestions}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        onSearch={handleSearch}
        onInputChange={handleInputChange}
        onSuggestionClick={handleSuggestionClick}
      />

      {/* weather info bar */}
      <WeatherInfoBar currentWeather={currentWeather} onDetailClick={fetchDetailedWeather} />

      {/* map container */}
      <div id="map" style={{ height: "100vh", width: "100vw" }}></div>

      {/* footer */}
      <Footer />

      {/* weather modal */}
      <WeatherModal modalOpen={modalOpen} modalData={modalData} forecast={forecast} onClose={closeModal} />
    </div>
  )
}
