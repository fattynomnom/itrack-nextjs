import Link from 'next/link'
import Input from '../components/Input'
import Button from '../components/Button'
import SplitPageLayout from '../components/SplitPageLayout'
import { ChangeEvent, FormEvent, useState } from 'react'
import { User } from '../types/User'
import { isEmail, isRequiredFieldsFilled } from '../utils/validation'
import { createUser } from '../services/FirebaseAuthService'
import { logError } from '../services/LoggingService'

interface FormData extends Pick<User, 'name' | 'email'> {
    password: string
    reenteredPassword: string
}

export default function Login() {
    const defaultFormData: FormData = {
        name: '',
        email: '',
        password: '',
        reenteredPassword: ''
    }

    const [formData, setFormData] = useState<FormData>({ ...defaultFormData })

    const [errors, setErrors] = useState<FormData>({ ...defaultFormData })

    const setData = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        setErrors({ ...errors, [event.target.name]: '' })
    }

    const validate = (): boolean => {
        setErrors({ ...defaultFormData })

        const { hasError, errors: requiredErrors } =
            isRequiredFieldsFilled<FormData>(formData, [
                'email',
                'password',
                'reenteredPassword'
            ])
        if (hasError) {
            setErrors(requiredErrors)
            return false
        }

        const emailError = isEmail(formData.email)
        if (emailError) {
            setErrors({ ...errors, email: emailError })
            return false
        }

        if (formData.password !== formData.reenteredPassword) {
            setErrors({
                ...errors,
                reenteredPassword: 'Password does not match'
            })
            return false
        }

        return true
    }

    const register = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!validate()) return

        const { email, password } = formData
        try {
            await createUser(email, password)
            // TODO: direct user to dashboard
        } catch (error) {
            logError(error)
        }
    }

    return (
        <SplitPageLayout pageName="Register">
            <h1>Register</h1>
            <p>Register your account to get started!</p>

            <form className="mt-10 space-y-7 flex flex-col" onSubmit={register}>
                <div className="space-y-5 flex flex-col">
                    <Input
                        label="Name (optional)"
                        type="text"
                        name="name"
                        onChange={setData}
                        errorMessage={errors.name}
                    />
                    <Input
                        label="Email"
                        type="text"
                        name="email"
                        onChange={setData}
                        errorMessage={errors.email}
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        onChange={setData}
                        errorMessage={errors.password}
                        hintMessage="Password should be at least 6 characters long"
                    />
                    <Input
                        label="Re-enter password"
                        type="password"
                        name="reenteredPassword"
                        onChange={setData}
                        errorMessage={errors.reenteredPassword}
                    />
                </div>

                <Button label="Register an account" type="submit" />
            </form>

            <small className="mt-3 text-center">
                Already have an account? <Link href="/login">Login here</Link>
            </small>
        </SplitPageLayout>
    )
}
