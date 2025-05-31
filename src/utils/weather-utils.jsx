import axios from 'axios';

export const OPENWEATHER_API_KEY = "ac9d21f60ea5a2b193883ac1cfb90618";

// OpenWeather API
const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  timeout: 5000,
  
});

// cek koordinat valid atau ngga
export const isValidCoordinate = (lat, lon) => {
  const numLat = typeof lat === 'string' ? parseFloat(lat) : lat;
  const numLon = typeof lon === 'string' ? parseFloat(lon) : lon;

  return (
    numLat !== undefined &&
    numLon !== undefined &&
    !isNaN(numLat) &&
    !isNaN(numLon) &&
    numLat >= -90 &&
    numLat <= 90 &&
    numLon >= -180 &&
    numLon <= 180
  );
};

// bikin pesan error yang lebih user friendly
export const getErrorMessage = (error, defaultMessage = 'Terjadi kesalahan') => {
  if (!error.response) {
    return error.message || defaultMessage;
  }

  const status = error.response.status;
  switch (status) {
    case 400:
      return 'Permintaan tidak valid. Silakan coba lokasi lain.';
    case 401:
      return 'Kunci API tidak valid. Silakan hubungi administrator.';
    case 404:
      return 'Data cuaca tidak ditemukan untuk lokasi ini.';
    case 429:
      return 'Terlalu banyak permintaan. Silakan tunggu sebentar.';
    case 500:
      return 'Server sedang bermasalah. Silakan coba lagi nanti.';
    default:
      return defaultMessage;
  }
};

// format timestamp jadi hari
export const formatDay = (timestamp) => {
  try {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('id-ID', { weekday: 'short' });
  } catch (error) {
    return 'N/A';
  }
};

// format timestamp jadi jam
export const formatHour = (timestamp) => {
  try {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  } catch (error) {
    return 'N/A';
  }
};

// dapetin URL icon cuaca
export const getIconUrl = (icon) => {
  if (!icon) return '/placeholder.svg';
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

// ambil data forecast harian (5 hari)
export const getDailyForecast = (forecast) => {
  if (!forecast || !forecast.list) return [];

  try {
    const dailyData = {};
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date] || new Date(item.dt * 1000).getHours() === 12) {
        dailyData[date] = item;
      }
    });
    return Object.values(dailyData).slice(0, 5);
  } catch (error) {
    console.error('Error processing daily forecast:', error);
    return [];
  }
};

// ambil data forecast per jam (24 jam)
export const getHourlyForecast = (forecast) => {
  if (!forecast || !forecast.list) return [];

  try {
    return forecast.list.slice(0, 8);
  } catch (error) {
    console.error('Error processing hourly forecast:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan cuaca saat ini
export const getCurrentWeather = async (lat, lon) => {
  try {
    if (!isValidCoordinate(lat, lon)) {
      throw new Error('Koordinat tidak valid');
    }

    const response = await weatherApi.get('weather', {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'id',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan prakiraan cuaca
export const getWeatherForecast = async (lat, lon) => {
  try {
    if (!isValidCoordinate(lat, lon)) {
      throw new Error('Koordinat tidak valid');
    }

    const response = await weatherApi.get('forecast', {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'id',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};

// Fungsi untuk mencari lokasi berdasarkan nama
export const searchLocation = async (query) => {
  try {
    if (!query || query.trim() === '') {
      throw new Error('Query pencarian kosong');
    }

    const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: query,
        limit: 5,
        appid: OPENWEATHER_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
};