import '../styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react'
import SideNav from '../components/SideNav'
import { theme } from '../plugins/chakra'
import { usePathname } from 'next/navigation'

const authRoutes = ['/login', '/register', '/najwa']

export default function MyApp({ Component, pageProps }) {
    const pathname = usePathname()

    return (
        <ChakraProvider theme={theme}>
            {authRoutes.includes(pathname) ? (
                <Component {...pageProps} />
            ) : (
                <div className="flex h-full">
                    <SideNav />
                    <div className="flex-1 overflow-y-auto">
                        <Component {...pageProps} />
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
