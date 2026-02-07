/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary brand colors matching existing design
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#667eea',
                    600: '#4338ca',
                    700: '#3730a3',
                    800: '#312e81',
                    900: '#1e1b4b',
                },
                // Existing design system colors
                success: '#10b981',
                warning: '#f59e0b',
                danger: '#dc2626',
                info: '#3b82f6',
            },
            fontFamily: {
                sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
                'card-hover': '0 12px 24px rgba(102, 126, 234, 0.2)',
                'button': '0 4px 12px rgba(102, 126, 234, 0.3)',
            },
            borderRadius: {
                'card': '16px',
                'button': '10px',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'gradient-sidebar': 'linear-gradient(180deg, #1a202c 0%, #2d3748 100%)',
                'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                'gradient-danger': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            },
            animation: {
                'pulse-status': 'pulse-status 2s infinite',
                'pulse-badge': 'pulse-badge 2s infinite',
                'slide-in-right': 'slideInRight 0.3s ease-out',
            },
            keyframes: {
                'pulse-status': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)' },
                    '50%': { boxShadow: '0 0 0 6px rgba(16, 185, 129, 0)' },
                },
                'pulse-badge': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
                'slideInRight': {
                    'from': { opacity: '0', transform: 'translateX(20px)' },
                    'to': { opacity: '1', transform: 'translateX(0)' },
                },
            },
        },
        screens: {
            'sm': '480px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1200px',
            '2xl': '1536px',
        },
    },
    plugins: [],
}
