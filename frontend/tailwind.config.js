/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0B3C6D',
                    dark: '#082d52',
                    light: '#eef4ff',
                },
                gold: {
                    DEFAULT: '#F4B400',
                    dark: '#c99500',
                    light: '#fff8e1',
                },
                trust: {
                    DEFAULT: '#1FAF5A',
                    dark: '#168a47',
                    light: '#ebf9f1',
                },
                background: '#F7F9FC',
                border: '#E6E8EC',
                textPrimary: '#1A1D1F',
                textSecondary: '#6F767E',
            },
            borderRadius: {
                '2xl': '20px',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
                'premium': '0 20px 50px rgba(11, 60, 109, 0.1)',
                'card': '0 8px 30px rgba(0, 0, 0, 0.06)',
            }
        },
    },
    plugins: [],
}
