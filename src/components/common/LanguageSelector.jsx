import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, availableLanguages } = useLanguage();
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleLanguageChange = (langCode) => {
        setLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className="nav-item dropdown" ref={dropdownRef}>
            <button
                className="btn btn-outline"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Select Language"
            >
                {language.toUpperCase()} <i className="ri-arrow-down-s-line"></i>
            </button>

            {isOpen && (
                <div className="login-dropdown-menu" style={{ minWidth: '220px', padding: '0.5rem' }}>
                    {availableLanguages.map((lang) => (
                        <button
                            key={lang.code}
                            className="login-dropdown-item"
                            onClick={() => handleLanguageChange(lang.code)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem',
                                marginBottom: '0.25rem',
                                border: language === lang.code ? '2px solid #6366f1' : '1px solid #e5e7eb',
                                borderRadius: '0.5rem',
                                backgroundColor: language === lang.code ? '#f0f0ff' : 'transparent',
                                transition: 'all 0.2s'
                            }}
                        >
                            <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{lang.flag}</span>
                            <div style={{ flex: 1, textAlign: 'left' }}>
                                <div style={{
                                    fontWeight: '600',
                                    fontSize: '0.95rem',
                                    color: language === lang.code ? '#6366f1' : 'inherit',
                                    marginBottom: '0.125rem'
                                }}>
                                    {lang.name}
                                </div>
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: '#6b7280',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    {lang.code}
                                </div>
                            </div>
                            {language === lang.code && (
                                <i className="ri-check-circle-fill" style={{
                                    color: '#6366f1',
                                    fontSize: '1.25rem'
                                }}></i>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
