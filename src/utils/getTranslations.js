import en from '../locales/en.json';
import ar from '../locales/ar.json';

const translations = {
  en,
  ar,
};

export const getTranslations = (locale) => {
  return translations[locale] || translations['en'];
};
