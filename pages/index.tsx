import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>iTrack</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className={styles.title}>Welcome to iTrack!</h1>

                <p className={styles.description}>
                    Keep your expenses in check and manage your budget,{' '}
                    <a href="/api/auth/login">login or signup here</a>
                </p>
            </main>

            <style jsx>{`
                main {
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </div>
    )
}
