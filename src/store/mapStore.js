import { create } from 'zustand';
import { fetchAddressDetails, searchLocation } from '../services/MapAPIHandling';
import { getData } from "../services/APIHandling";
import { API_ENDPOINTS_PUPLIC } from "../services/api/EndpointsPuplic";

const useMapStore = create((set, get) => ({
  // ------ الحالة الأساسية ------
  selectedPosition: [33.5138, 36.2765],
  zoom: 14,
  reports: [],
  isLoadingReports: false,
  reportsError: null,
  lastUpdated: null, // وقت آخر تحديث (ISO string)

  locationDetails: '',
  isLoadingAddress: false,
  addressError: null,

  searchQuery: '',
  isSearching: false,
  searchError: null,

  isLocating: false,
  gpsError: null,

  // ------ الإجراءات (Actions) ------

  // تعيين الموقع وجلب تفاصيل المنطقة تلقائياً
  setPosition: async (lat, lng) => {
    set({ selectedPosition: [lat, lng], addressError: null });
    await get().fetchAddressForPosition(lat, lng);
  },

  // جلب تفاصيل المنطقة (Reverse Geocoding)
  fetchAddressForPosition: async (lat, lng) => {
    set({ isLoadingAddress: true, addressError: null, locationDetails: '' });
    try {
      const details = await fetchAddressDetails(lat, lng);
      set({ locationDetails: details, isLoadingAddress: false });
    } catch (error) {
      set({ addressError: error.message || 'خطأ في جلب تفاصيل المنطقة', isLoadingAddress: false });
    }
  },

  // جلب البلاغات من API
  fetchReports: async () => {
    set({ isLoadingReports: true, reportsError: null });
    try {
      const response = await getData(API_ENDPOINTS_PUPLIC.Website.REPORT);
      set({ reports: response.data, isLoadingReports: false, lastUpdated: new Date().toISOString(), });
 
      const { selectedPosition } = get();
      if (response.data.length > 0 && !selectedPosition) {
        const first = response.data[0];
        get().setPosition(first.lat, first.lng);
      }
    } catch (error) {
      set({ reportsError: error.message || 'فشل في جلب البلاغات', isLoadingReports: false });
    }
  },

  // البحث عن موقع (Geocoding)
  searchLocation: async (query) => {
    set({ isSearching: true, searchError: null });
    try {
      const result = await searchLocation(query);
      if (result) {
        const { lat, lon, display_name } = result;
        await get().setPosition(parseFloat(lat), parseFloat(lon));
        set((state) => ({
          locationDetails: state.locationDetails || `📍 ${display_name}`,
          isSearching: false,
        }));
      } else {
        set({ searchError: 'لم يتم العثور على الموقع', isSearching: false });
      }
    } catch (error) {
      set({ searchError: error.message || 'خطأ في البحث', isSearching: false });
    }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  // تحديد موقع المستخدم عبر GPS
  locateUser: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        set({ gpsError: 'المتصفح لا يدعم تحديد الموقع' });
        reject(new Error('المتصفح لا يدعم تحديد الموقع'));
        return;
      }
      set({ isLocating: true, gpsError: null });
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await get().setPosition(latitude, longitude);
          set({ isLocating: false });
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          let msg = 'تعذر الوصول إلى الموقع. ';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              msg += 'الرجاء السماح بالوصول إلى الموقع.';
              break;
            case error.POSITION_UNAVAILABLE:
              msg += 'معلومات الموقع غير متوفرة.';
              break;
            case error.TIMEOUT:
              msg += 'انتهت المهلة. حاول مرة أخرى.';
              break;
            default:
              msg += 'حدث خطأ غير متوقع.';
          }
          set({ gpsError: msg, isLocating: false });
          reject(new Error(msg));
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  },

  // التحكم في التكبير
  zoomIn: () => set((state) => ({ zoom: Math.min(state.zoom + 1, 18) })),
  zoomOut: () => set((state) => ({ zoom: Math.max(state.zoom - 1, 1) })),

   // ------ دوال التحديث التلقائي ------
  startAutoRefresh: (interval = 300000, params = {}) => {
    // إيقاف أي فاصل سابق
    const existingInterval = get().autoRefreshInterval;
    if (existingInterval) {
      clearInterval(existingInterval);
    }
    // جلب فوري أول مرة
    get().fetchReports(params);
    // جدولة التحديث الدوري
    const intervalId = setInterval(() => {
      get().fetchReports(params);
    }, interval);
    set({ autoRefreshInterval: intervalId });
  },

  stopAutoRefresh: () => {
    const intervalId = get().autoRefreshInterval;
    if (intervalId) {
      clearInterval(intervalId);
      set({ autoRefreshInterval: null });
    }
  },

  // تنظيف شامل (استدعاؤه عند إلغاء تحميل المكون)
  cleanup: () => {
    get().stopAutoRefresh();
  },

  // إعادة تعيين الحالة (اختياري)
  reset: () => {
    get().stopAutoRefresh();
    set({
      selectedPosition: [33.5138, 36.2765],
      zoom: 14,
      reports: [],
      locationDetails: '',
      searchQuery: '',
      lastUpdated: null,
      // ... إلخ
    });
  },
}));

export default useMapStore;