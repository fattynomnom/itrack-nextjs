import '../styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react'
import { Color } from '@tremor/react'
import SideNav from '../components/SideNav'
import TopNav from '../components/TopNav'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'
import { theme } from '../plugins/chakra'
import { usePathname } from 'next/navigation'

const themeConfig = resolveConfig(tailwindConfig)

const authRoutes = ['/login', '/register', '/najwa']

const categories = [
    {
        label: 'Electronics',
        amount: 988,
        color: themeConfig.theme.colors.orange[200],
        colorName: 'orange' as Color
    },
    {
        label: 'Travel',
        amount: 321,
        color: themeConfig.theme.colors.yellow[200],
        colorName: 'yellow' as Color
    },
    {
        label: 'Necessities',
        amount: 539,
        color: themeConfig.theme.colors.successlight,
        colorName: 'green' as Color
    },
    {
        label: 'Bills',
        amount: 789,
        color: themeConfig.theme.colors.lime[200],
        colorName: 'lime' as Color
    },
    {
        label: 'Food',
        amount: 987,
        color: themeConfig.theme.colors.primary,
        colorName: 'blue' as Color
    },
    {
        label: 'Housing',
        amount: 3241,
        color: themeConfig.theme.colors.secondary,
        colorName: 'indigo' as Color
    },
    {
        label: 'Hobby',
        amount: 321,
        color: themeConfig.theme.colors.fuchsia[200],
        colorName: 'fuchsia' as Color
    },
    {
        label: 'Pets',
        amount: 398,
        color: themeConfig.theme.colors.rose[200],
        colorName: 'rose' as Color
    }
]

export default function MyApp({ Component, pageProps }) {
    const pathname = usePathname()

    return (
        <ChakraProvider theme={theme}>
            {authRoutes.includes(pathname) ? (
                <Component {...pageProps} />
            ) : (
                <div className="flex h-full">
                    <SideNav className="hidden md:block" />
                    <div className="flex-1 overflow-y-auto">
                        <div className="h-full">
                            <TopNav categories={categories} />
                            <Component {...pageProps} categories={categories} />
                        </div>
                    </div>

                    <style jsx global>{`
                        html,
                        body,
                        body > div:first-child,
                        div#__next,
                        div#__next > main {
                            height: 100%;
                        }
                    `}</style>
                </div>
            )}
        </ChakraProvider>
    )
}
