// semua CSS styles buat weather app
// dipisah biar ga berantakan di komponen utama
export const weatherStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    overflow: hidden;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .glass-effect {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  
  .search-container {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    width: 100%;
    max-width: 500px;
    padding: 0 20px;
  }
  
  .search-wrapper {
    position: relative;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .search-wrapper:focus-within {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  .search-input {
    width: 100%;
    padding: 16px 20px 16px 50px;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    font-weight: 500;
    color: #2d3748;
    font-family: 'Inter', sans-serif;
  }
  
  .search-input::placeholder {
    color: #a0aec0;
    font-weight: 400;
  }
  
  .search-icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: #667eea;
    z-index: 10;
  }
  
  .search-button {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 12px;
    padding: 8px 16px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
  }
  
  .search-button:hover:not(:disabled) {
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
  
  .search-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .clear-button {
    position: absolute;
    right: 80px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #a0aec0;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    transition: all 0.2s ease;
  }
  
  .clear-button:hover {
    background: rgba(160, 174, 192, 0.1);
    color: #667eea;
  }
  
  .suggestions-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 0 0 16px 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-top: none;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1001;
  }
  
  .suggestion-item {
    padding: 12px 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .suggestion-item:hover {
    background: rgba(102, 126, 234, 0.1);
  }
  
  .suggestion-item:last-child {
    border-bottom: none;
  }
  
  .weather-info-bar {
    position: absolute;
    top: 90px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    padding: 16px 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    gap: 16px;
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  
  .weather-info-bar.visible {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }
  
  .weather-info-bar img {
    width: 48px;
    height: 48px;
  }
  
  .weather-temp {
    font-size: 24px;
    font-weight: 700;
    color: #2d3748;
  }
  
  .weather-desc {
    font-size: 14px;
    color: #667eea;
    text-transform: capitalize;
    font-weight: 500;
  }
  
  .weather-location {
    font-size: 16px;
    font-weight: 600;
    color: #4a5568;
  }
  
  .loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  /* Footer Styles */
  .app-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%);
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 16px 24px;
    z-index: 998;
    transition: all 0.3s ease;
  }
  
  .footer-content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-text {
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
  
  .footer-name {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
    font-size: 15px;
    text-shadow: none;
  }
  
  .footer-heart {
    color: #ff6b6b;
    animation: heartbeat 2s ease-in-out infinite;
  }
  
  .footer-code {
    color: #667eea;
  }
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  @keyframes slideInUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .map-popup-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    font-family: 'Inter', sans-serif;
    min-width: 280px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 20px;
    text-align: center;
  }
  
  .map-popup-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }
  
  .map-popup-loading p {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
  }
  
  .map-popup-error {
    color: #ffffff;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
    padding: 24px;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    border-radius: 20px;
    min-width: 280px;
    box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
  }
  
  .map-popup-content {
    padding: 0;
    font-family: 'Inter', sans-serif;
    width: 380px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideInUp 0.4s ease-out;
  }
  
  .map-popup-header {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    overflow: hidden;
  }
  
  .map-popup-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%);
    background-size: 200% 100%;
    animation: shimmer 2s linear infinite;
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  .map-popup-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 8px;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  .map-popup-title-section {
    flex: 1;
  }
  
  .map-popup-city {
    font-weight: 800;
    font-size: 24px;
    margin: 0 0 8px 0;
    color: #1a202c;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .map-popup-desc {
    font-size: 16px;
    margin: 0;
    text-transform: capitalize;
    color: #667eea;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .map-popup-temp-section {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    padding: 24px;
    text-align: center;
    position: relative;
  }
  
  .map-popup-temp {
    font-size: 48px;
    font-weight: 900;
    margin: 0 0 8px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .map-popup-feels-like {
    font-size: 14px;
    color: #718096;
    font-weight: 500;
    margin-bottom: 20px;
  }
  
  .map-popup-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  
  .map-popup-detail-item {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.3);
    position: relative;
    overflow: hidden;
  }
  
  .map-popup-detail-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
  
  .map-popup-detail-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .map-popup-detail-item:hover::before {
    opacity: 1;
  }
  
  .map-popup-detail-icon {
    width: 24px;
    height: 24px;
    color: #667eea;
    margin-bottom: 8px;
  }
  
  .map-popup-detail-label {
    font-size: 12px;
    color: #718096;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }
  
  .map-popup-detail-value {
    font-size: 16px;
    font-weight: 700;
    color: #2d3748;
  }
  
  .map-popup-progress-section {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    padding: 20px 24px;
  }
  
  .map-popup-progress-item {
    margin-bottom: 16px;
  }
  
  .map-popup-progress-item:last-child {
    margin-bottom: 0;
  }
  
  .map-popup-progress-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #4a5568;
  }
  
  .map-popup-progress-bar {
    height: 8px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
  
  .map-popup-progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.8s ease;
    position: relative;
    overflow: hidden;
  }
  
  .map-popup-progress-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
    animation: progressShine 2s ease-in-out infinite;
  }
  
  @keyframes progressShine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  .humidity-fill {
    background: linear-gradient(90deg, #3182ce 0%, #63b3ed 100%);
  }
  
  .visibility-fill {
    background: linear-gradient(90deg, #38a169 0%, #68d391 100%);
  }
  
  .pressure-fill {
    background: linear-gradient(90deg, #d69e2e 0%, #f6e05e 100%);
  }
  
  .wind-fill {
    background: linear-gradient(90deg, #805ad5 0%, #b794f6 100%);
  }
  
  .map-popup-footer {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 16px 24px;
    text-align: center;
  }
  
  .map-popup-footer-text {
    color: rgba(255, 255, 255, 0.9);
    font-size: 12px;
    font-weight: 500;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  
  .leaflet-popup-content-wrapper {
    border-radius: 24px;
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
    border: none;
    overflow: hidden;
    padding: 0;
  }
  
  .leaflet-popup-content {
    margin: 0;
    width: auto !important;
  }
  
  .leaflet-popup-tip {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.2);
  }
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    padding: 20px;
    overflow-y: auto;
  }
  
  .modal-content {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 600px;
    max-height: 85vh;
    overflow-y: auto;
    position: relative;
    animation: slideInUp 0.3s ease-out;
  }
  
  .modal-header {
    padding: 24px 24px 16px 24px;
    position: relative;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: #f7fafc;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #4a5568;
    z-index: 10;
  }
  
  .modal-close:hover {
    background: #edf2f7;
    transform: scale(1.05);
  }
  
  .modal-weather-main {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 16px;
  }
  
  .modal-weather-icon {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 8px;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }
  
  .modal-weather-info h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1a202c;
    margin: 0 0 4px 0;
  }
  
  .modal-weather-info p {
    font-size: 14px;
    color: #667eea;
    margin: 0 0 8px 0;
    text-transform: capitalize;
    font-weight: 500;
  }
  
  .modal-temp {
    font-size: 36px;
    font-weight: 800;
    color: #2d3748;
    margin: 0;
  }
  
  .modal-feels-like {
    font-size: 14px;
    color: #718096;
    margin: 4px 0 0 0;
  }
  
  .modal-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
    padding: 20px 24px;
    background: #f8fafc;
  }
  
  .modal-stat-item {
    background: white;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
  }
  
  .modal-stat-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .modal-stat-icon {
    margin: 0 auto 8px auto;
    color: #667eea;
  }
  
  .modal-stat-label {
    font-size: 12px;
    color: #718096;
    font-weight: 500;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .modal-stat-value {
    font-size: 16px;
    font-weight: 700;
    color: #2d3748;
  }
  
  .modal-forecast {
    padding: 20px 24px;
  }
  
  .modal-forecast-title {
    font-size: 18px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .modal-forecast-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 12px;
    margin-bottom: 24px;
  }
  
  .modal-forecast-item {
    background: #f8fafc;
    border-radius: 12px;
    padding: 12px;
    text-align: center;
    transition: all 0.2s ease;
  }
  
  .modal-forecast-item:hover {
    background: #edf2f7;
    transform: translateY(-1px);
  }
  
  .modal-forecast-day {
    font-size: 12px;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 6px;
  }
  
  .modal-forecast-icon {
    width: 32px;
    height: 32px;
    margin: 0 auto 6px auto;
  }
  
  .modal-forecast-temp {
    font-size: 14px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 2px;
  }
  
  .modal-forecast-desc {
    font-size: 10px;
    color: #718096;
    text-transform: capitalize;
  }
  
  .modal-hourly {
    overflow-x: auto;
    padding-bottom: 8px;
  }
  
  .modal-hourly-grid {
    display: flex;
    gap: 12px;
    min-width: max-content;
    padding-bottom: 8px;
  }
  
  .modal-hourly-item {
    background: #f8fafc;
    border-radius: 12px;
    padding: 12px;
    text-align: center;
    min-width: 80px;
    transition: all 0.2s ease;
  }
  
  .modal-hourly-item:hover {
    background: #edf2f7;
    transform: translateY(-1px);
  }
  
  .modal-hourly-time {
    font-size: 11px;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 6px;
  }
  
  .modal-hourly-icon {
    width: 28px;
    height: 28px;
    margin: 0 auto 6px auto;
  }
  
  .modal-hourly-temp {
    font-size: 13px;
    font-weight: 700;
    color: #2d3748;
  }
  
  /* Error Modal Styles */
  .error-modal-content {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
    position: relative;
    animation: slideInUp 0.3s ease-out;
    text-align: center;
    padding: 40px 30px;
  }
  
  .error-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%);
    margin-bottom: 24px;
    color: #e53e3e;
  }
  
  .error-title {
    font-size: 24px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 12px;
  }
  
  .error-message {
    color: #718096;
    margin-bottom: 32px;
    font-size: 16px;
    line-height: 1.5;
  }
  
  .error-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 12px;
    padding: 12px 24px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    fontSize: 16px;
    transition: all 0.2s ease;
  }
  
  .error-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
  
  @media (max-width: 768px) {
    .search-container {
      max-width: 90%;
      padding: 0 10px;
    }
    
    .weather-info-bar {
      max-width: 90%;
      padding: 12px 16px;
    }
    
    .modal-content {
      max-width: 95%;
      margin: 10px;
    }
    
    .error-modal-content {
      max-width: 95%;
      margin: 10px;
      padding: 30px 20px;
    }
    
    .modal-header {
      padding: 20px 20px 16px 20px;
    }
    
    .modal-stats {
      padding: 16px 20px;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
    
    .modal-forecast {
      padding: 16px 20px;
    }
    
    .modal-weather-main {
      flex-direction: column;
      text-align: center;
      gap: 16px;
    }
    
    .modal-temp {
      font-size: 32px;
    }
    
    .map-popup-content {
      width: 320px;
    }
    
    .map-popup-temp {
      font-size: 36px;
    }
    
    .map-popup-city {
      font-size: 20px;
    }
    
    .app-footer {
      padding: 12px 16px;
    }
    
    .footer-content {
      flex-direction: column;
      gap: 8px;
    }
    
    .footer-text {
      font-size: 13px;
    }
    
    .footer-name {
      font-size: 14px;
    }
  }
`
