import Head from 'next/head'
import Link from 'next/link'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Login() {
    return (
        <main className="grid grid-cols-2 w-full h-full">
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-gradient-to-r from-secondary to-primary" />
            <div className="flex flex-col p-28">
                <h1>Hello</h1>
                <p>
                    Login to your account or click register if you do not have
                    one.
                </p>

                <div className="mt-10 space-y-5 flex flex-col mb-7">
                    <Input label="Email" type="text" name="email" />
                    <Input label="Password" type="password" name="password" />
                </div>

                <Button label="Login" />

                <small className="mt-3 text-center">
                    Don&apos;t have an account? Don&apos;t worry,{' '}
                    <Link href="/register">register here</Link>
                </small>
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
        </main>
    )
}
