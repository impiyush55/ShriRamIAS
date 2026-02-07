import en from './en.json';
import hi from './hi.json';

const translations = {
    en,
    hi
};

export default translations;

// Helper function to get translated text
export const getTranslation = (language, key) => {
    const keys = key.split('.');
    let value = translations[language] || translations.en;

    for (const k of keys) {
        value = value?.[k];
        if (!value) {
            // Fallback to English if translation not found
            value = translations.en;
            for (const fallbackKey of keys) {
                value = value?.[fallbackKey];
                if (!value) return key; // Return key if not found
            }
            return value;
        }
    }

    return value || key;
};
