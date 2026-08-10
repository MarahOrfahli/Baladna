import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../i18n';

export const useLangStore = create(
  persist(
    (set, get) => ({
      lang: i18n.language || 'ar',
      toggleLanguage: () => {
        const currentLang = get().lang; 
        const nextLang = currentLang === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(nextLang);
        set({ lang: nextLang });
      },
    }),
    {
      name: 'app-language', 
    }
  )
);

export const initializeAppLanguage = () => {
  const savedState = localStorage.getItem('app-language');
  if (savedState) {
    const { lang } = JSON.parse(savedState).state;
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }
};
