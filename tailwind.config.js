/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                coral: {
                    50: '#fff5f5',
                    100: '#ffe0e0',
                    200: '#ffc5c5',
                    300: '#ff9b9b',
                    400: '#ff7b7b',
                    500: '#FF5A5F',
                    600: '#e04e52',
                    700: '#c43a3e',
                    800: '#9c2f32',
                    900: '#7a2628',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
