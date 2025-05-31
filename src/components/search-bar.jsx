"use client"

import { SearchIcon, XIcon, MapPinIcon } from "./icons"

// komponen search bar dengan suggestions
// lumayan kompleks jadi dipisah sendiri
export default function SearchBar({
  inputCity,
  setInputCity,
  isLoading,
  searchSuggestions,
  showSuggestions,
  setShowSuggestions,
  onSearch,
  onInputChange,
  onSuggestionClick,
}) {
  return (
    <div className="search-container">
      <form onSubmit={onSearch} className="search-wrapper">
        <input
          type="text"
          value={inputCity}
          onChange={onInputChange}
          placeholder="Cari kota atau lokasi..."
          className="search-input"
          disabled={isLoading}
          onFocus={() => inputCity.length > 2 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {inputCity && (
          <button
            type="button"
            onClick={() => {
              setInputCity("")
              setShowSuggestions(false)
            }}
            className="clear-button"
          >
            <XIcon />
          </button>
        )}
        <button type="submit" disabled={!inputCity.trim() || isLoading} className="search-button">
          {isLoading ? <div className="loading-spinner" /> : "Cari"}
        </button>

        {/* dropdown suggestions */}
        {showSuggestions && searchSuggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {searchSuggestions.map((location, index) => (
              <div key={index} className="suggestion-item" onClick={() => onSuggestionClick(location)}>
                <MapPinIcon />
                <div>
                  <div style={{ fontWeight: 600 }}>{location.name}</div>
                  <div style={{ fontSize: "12px", color: "#718096" }}>
                    {location.state && `${location.state}, `}
                    {location.country}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  )
}
