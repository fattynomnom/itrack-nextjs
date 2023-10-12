const colors = require('tailwindcss/colors')

// #region tremor config
const tremorColors = {
    // light mode
    tremor: {
        brand: {
            faint: '#eff6ff', // blue-50
            muted: '#bfdbfe', // blue-200
            subtle: '#60a5fa', // blue-400
            DEFAULT: colors.blue[400],
            emphasis: '#1d4ed8', // blue-700
            inverted: '#ffffff' // white
        },
        background: {
            muted: '#f9fafb', // gray-50
            subtle: '#f3f4f6', // gray-100
            DEFAULT: '#ffffff', // white
            emphasis: '#374151' // gray-700
        },
        border: {
            DEFAULT: '#e5e7eb' // gray-200
        },
        divide: {
            DEFAULT: '#e5e7eb' // gray-200
        },
        ring: {
            DEFAULT: '#e5e7eb' // gray-200
        },
        content: {
            subtle: '#9ca3af', // gray-400
            DEFAULT: colors.gray[600],
            emphasis: '#374151', // gray-700
            strong: '#111827', // gray-900
            inverted: '#ffffff' // white
        }
    },
    // dark mode
    'dark-tremor': {
        brand: {
            faint: '#0B1229', // custom
            muted: '#172554', // blue-950
            subtle: '#1e40af', // blue-800
            DEFAULT: '#3b82f6', // blue-500
            emphasis: '#60a5fa', // blue-400
            inverted: '#030712' // gray-950
        },
        background: {
            muted: '#131A2B', // custom
            subtle: '#1f2937', // gray-800
            DEFAULT: '#111827', // gray-900
            emphasis: '#d1d5db' // gray-300
        },
        border: {
            DEFAULT: '#1f2937' // gray-800
        },
        divide: {
            DEFAULT: '#1f2937' // gray-800
        },
        ring: {
            DEFAULT: '#1f2937' // gray-800
        },
        content: {
            subtle: '#4b5563', // gray-600
            DEFAULT: '#6b7280', // gray-600
            emphasis: '#e5e7eb', // gray-200
            strong: '#f9fafb', // gray-50
            inverted: '#000000' // black
        }
    }
}
const tremorBoxShadows = {
    // light
    'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    'tremor-card':
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    'tremor-dropdown':
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    // dark
    'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    'dark-tremor-card':
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    'dark-tremor-dropdown':
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
}
const tremorBorderRadius = {
    'tremor-small': '0.375rem',
    'tremor-default': '0.5rem',
    'tremor-full': '9999px'
}
const tremorFontSize = {
    'tremor-label': ['0.75rem'],
    'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
    'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
    'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }]
}
// #endregion

// #region theme
const themeColors = {
    primary: colors.blue[200],
    secondary: colors.indigo[200],
    danger: '#e63946',
    dangerdark: colors.red[950],
    successlight: colors.green[200],
    success: colors.green[300],
    successdark: colors.green[600],
    bgcolor: colors.gray[200]
}
const defaultColors = {
    // overriding colors used in tremor
    orange: {
        500: colors.orange[200]
    },
    yellow: {
        500: colors.yellow[200]
    },
    green: {
        500: themeColors.successlight
    },
    lime: {
        500: colors.lime[200]
    },
    blue: {
        500: themeColors.primary
    },
    indigo: {
        500: themeColors.secondary
    },
    fuchsia: {
        500: colors.fuchsia[200]
    },
    rose: {
        500: colors.rose[200]
    },
    gray: {
        200: colors.gray[200]
    }
}
// #endregion

/** @type {import('tailwindcss').Config} */
/* eslint-disable max-len */
module.exports = {
    defaultColors,
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './node_modules/@tremor/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: 'class', // TODO: Remove this when implementing dark mode
    theme: {
        transparent: 'transparent',
        current: 'currentColor',
        extend: {
            colors: {
                ...tremorColors,
                ...themeColors,
                ...defaultColors
            },
            boxShadow: tremorBoxShadows,
            borderRadius: tremorBorderRadius,
            fontSize: tremorFontSize
        }
    },
    safelist: [
        {
            pattern:
                /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ['hover', 'ui-selected']
        },
        {
            pattern:
                /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ['hover', 'ui-selected']
        },
        {
            pattern:
                /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ['hover', 'ui-selected']
        },
        {
            pattern:
                /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
        },
        {
            pattern:
                /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
        },
        {
            pattern:
                /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
        }
    ],
    plugins: [require('@headlessui/tailwindcss')]
}
