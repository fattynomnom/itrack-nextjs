const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.blue[200],
                secondary: colors.indigo[200],
                danger: '#e63946',
                dangerdark: colors.red[950],
                successlight: colors.teal[200],
                success: colors.teal[300],
                successdark: colors.teal[600],
                bglight: '#f5f5f5'
            }
        }
    },
    plugins: []
}
