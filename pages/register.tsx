import Link from 'next/link'
import Input from '../components/Input'
import Button from '../components/Button'
import SplitPageLayout from '../components/SplitPageLayout'

export default function Login() {
    return (
        <SplitPageLayout pageName='Register'>
            <h1>Register</h1>
            <p>
                Register your account to get started!
            </p>

            <div className="mt-10 space-y-5 flex flex-col mb-7">
                <Input label="Name" type="text" name="name" />
                <Input label="Email" type="text" name="email" />
                <Input label="Password" type="password" name="password" />
                <Input label="Re-enter password" type="password" name="password" />
            </div>

            <Button label="Register an account" />

            <small className="mt-3 text-center">
                Already have an account?{' '}
                <Link href="/login">Login here</Link>
            </small>
        </SplitPageLayout>
    )
}
