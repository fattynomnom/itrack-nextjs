const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

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
                primary: colors.blue[300],
                secondary: colors.indigo[300]
            },
            fontFamily: {
                sans: ['var(--font-montserrat)', ...fontFamily.sans]
            }
        }
    },
    plugins: []
}
