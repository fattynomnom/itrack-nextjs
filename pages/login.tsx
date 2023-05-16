import Link from 'next/link'
import Input from '../components/Input'
import Button from '../components/Button'
import SplitPageLayout from '../components/SplitPageLayout'

export default function Login() {
    return (
        <SplitPageLayout pageName='Login'>
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
        </SplitPageLayout>
    )
}