import {nominatimAPI} from "./api/axiosClients";

export const fetchAddressDetails = async (lat, lng) => {
  try {
    const response = await nominatimAPI.get('/reverse', {
      params: {
        format: 'json',
        lat,
        lon: lng,
        zoom: 18,
        'accept-language': 'ar',
      },
    });
    const data = response.data;
    if (!data || !data.display_name) {
      throw new Error('لا توجد بيانات مفصلة لهذا الموقع');
    }
    const address = data.address || {};
    const road = address.road || address.pedestrian || '';
    const neighbourhood = address.neighbourhood || address.suburb || '';
    const city = address.city || address.town || address.village || '';
    const country = address.country || '';
    const parts = [];
    if (road) parts.push(`📍 ${road}`);
    if (neighbourhood) parts.push(`🏘️ ${neighbourhood}`);
    if (city) parts.push(`🏙️ ${city}`);
    if (country) parts.push(`🌍 ${country}`);
    return parts.length > 0 ? parts.join(' - ') : data.display_name;
  } catch (error) {
    console.log(error);
  }
};

export const searchLocation = async (query) => {
  try {
    const response = await nominatimAPI.get('/search', {
      params: {
        format: 'json',
        q: query,
        'accept-language': 'ar',
        limit: 1,
      },
    });
    const data = response.data;
    if (data && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};