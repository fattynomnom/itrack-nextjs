import Head from 'next/head'
import { ReactNode } from 'react'

export default function SplitPageLayout({
    pageName,
    children
}: {
    pageName: string
    children: ReactNode
}) {
    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
            <Head>
                <title>{pageName}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-gradient-to-r from-secondary to-primary hidden lg:block" />
            <div className="flex flex-col p-28 self-center">{children}</div>

            <style jsx global>{`
                html,
                body,
                body > div:first-child,
                div#__next,
                div#__next > main {
                    height: 100%;
                }
            `}</style>
        </main>
    )
}
