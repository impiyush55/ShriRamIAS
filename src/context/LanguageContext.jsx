import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = useState(() => {
        // Get from localStorage or default to English
        const saved = localStorage.getItem('selectedLanguage');
        return saved || 'en';
    });

    const availableLanguages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
    ];

    const setLanguage = (langCode) => {
        setLanguageState(langCode);
        localStorage.setItem('selectedLanguage', langCode);
    };

    const value = {
        language,
        setLanguage,
        availableLanguages,
        currentLanguage: availableLanguages.find(lang => lang.code === language)
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
