import { create } from "zustand";
import {
  fetchAddressDetails,
  searchLocation
} from "../../../api";
import { getLatestAnonymousReports } from "../../../services";

export const useMapStore = create((set, get) => ({
  selectedPosition: [33.5138, 36.2765],
  zoom: 14,
  reports: [],
  isLoadingReports: false,
  reportsError: null,
  lastUpdated: null,

  locationDetails: "",
  isLoadingAddress: false,
  addressError: null,

  searchQuery: "",
  isSearching: false,
  searchError: null,

  isLocating: false,
  gpsError: null,

  autoRefreshInterval: null,

  // Setting up the location and getting the details..
  setPosition: async (lat, lng) => {
    set({ selectedPosition: [lat, lng], addressError: null });
    await get().fetchAddressForPosition(lat, lng);
  },

  fetchAddressForPosition: async (lat, lng) => {
    set({ isLoadingAddress: true, addressError: null, locationDetails: "" });
    try {
      const details = await fetchAddressDetails(lat, lng);
      set({ locationDetails: details, isLoadingAddress: false });
    } catch (error) {
      set({
        addressError: error.message || "خطأ في جلب تفاصيل المنطقة",
        isLoadingAddress: false
      });
    }
  },

  // جلب البلاغات مع إمكانية تمرير بارامترات
  fetchReports: async () => {
    set({ isLoadingReports: true, reportsError: null });
    try {
      const response = await getLatestAnonymousReports()
      set({
        reports: response.data,
        isLoadingReports: false,
        lastUpdated: new Date().toISOString()
      });
      // إذا لم يكن هناك موقع محدد، استخدم أول بلاغ
      const { selectedPosition } = get();
      if (response.data.length > 0 && !selectedPosition) {
        const first = response.data[0];
        get().setPosition(first.lat, first.lng);
      }
    } catch (error) {
      set({
        reportsError: error.message || "فشل في جلب البلاغات",
        isLoadingReports: false
      });
    }
  },

  // Searching..
  searchLocation: async (query) => {
    set({ isSearching: true, searchError: null });
    try {
      const result = await searchLocation(query);
      if (result) {
        const { lat, lon, display_name } = result;
        await get().setPosition(parseFloat(lat), parseFloat(lon));
        set((state) => ({
          locationDetails: state.locationDetails || `📍 ${display_name}`,
          isSearching: false
        }));
      } else {
        set({ searchError: "لم يتم العثور على الموقع", isSearching: false });
      }
    } catch (error) {
      set({ searchError: error.message || "خطأ في البحث", isSearching: false });
    }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  // GPS Location..
  locateUser: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const msg = "المتصفح لا يدعم تحديد الموقع";
        set({ gpsError: msg });
        reject(new Error(msg));
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
          let msg = "تعذر الوصول إلى الموقع. ";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              msg += "الرجاء السماح بالوصول إلى الموقع.";
              break;
            case error.POSITION_UNAVAILABLE:
              msg += "معلومات الموقع غير متوفرة.";
              break;
            case error.TIMEOUT:
              msg += "انتهت المهلة. حاول مرة أخرى.";
              break;
            default:
              msg += "حدث خطأ غير متوقع.";
          }
          set({ gpsError: msg, isLocating: false });
          reject(new Error(msg));
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  },

  // Zoom Controll..
  zoomIn: () => set((state) => ({ zoom: Math.min(state.zoom + 1, 18) })),
  zoomOut: () => set((state) => ({ zoom: Math.max(state.zoom - 1, 1) })),

  // Auto Refreshing Every 5 minutes...
  startAutoRefresh: (interval = 300000, params = {}) => {
    const existing = get().autoRefreshInterval;
    if (existing) clearInterval(existing);

    // getting reports data..
    get().fetchReports(params);

    const id = setInterval(() => {
      get().fetchReports(params);
    }, interval);
    set({ autoRefreshInterval: id });
  },

  stopAutoRefresh: () => {
    const id = get().autoRefreshInterval;
    if (id) {
      clearInterval(id);
      set({ autoRefreshInterval: null });
    }
  },

  // Cleaning
  cleanup: () => {
    get().stopAutoRefresh();
  },

  // Reset is optional..
  reset: () => {
    get().stopAutoRefresh();
    set({
      selectedPosition: [33.5138, 36.2765],
      zoom: 14,
      reports: [],
      locationDetails: "",
      searchQuery: "",
      lastUpdated: null,
      isLoadingReports: false,
      reportsError: null,
      isLoadingAddress: false,
      addressError: null,
      isSearching: false,
      searchError: null,
      isLocating: false,
      gpsError: null
    });
  }
}));
