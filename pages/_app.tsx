import '../styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../plugins/chakra'

export default function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}
