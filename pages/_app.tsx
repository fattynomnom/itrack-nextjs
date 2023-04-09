import { Montserrat } from 'next/font/google'
import '../styles/globals.css'

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat'
})

export default function MyApp({ Component, pageProps }) {
    return (
        <main className={`${montserrat.variable} font-sans`}>
            <Component {...pageProps} />
        </main>
    )
}
