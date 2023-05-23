import Link from 'next/link'
import Input from '../components/Input'
import Button from '../components/Button'
import SplitPageLayout from '../components/SplitPageLayout'
import { ChangeEvent, FormEvent, useState } from 'react'
import {
    VALIDATION_MESSAGES,
    getEmailError,
    isRequiredFieldsFilled
} from '../utils/validation'
import { AUTH_ERROR_CODES, loginUser } from '../services/AuthService'
import { logError } from '../services/LoggingService'
import { useRouter } from 'next/router'

interface FormData {
    email: string
    password: string
}

export default function Login() {
    const router = useRouter()

    const defaultFormData: FormData = {
        email: '',
        password: ''
    }

    const [formData, setFormData] = useState<FormData>({ ...defaultFormData })
    const [errors, setErrors] = useState<FormData>({ ...defaultFormData })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const setData = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        setErrors({ ...errors, [event.target.name]: '' })
    }

    const validate = (): boolean => {
        setErrors({ ...defaultFormData })

        const { hasError, errors: requiredErrors } =
            isRequiredFieldsFilled<FormData>(formData, ['email', 'password'])
        if (hasError) {
            setErrors(requiredErrors)
            return false
        }

        const emailError = getEmailError(formData.email)
        if (emailError) {
            setErrors({ ...errors, email: emailError })
            return false
        }

        return true
    }

    const login = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!validate()) return

        setIsLoading(true)

        const { email, password } = formData
        try {
            await loginUser(email, password)
            router.push('/dashboard')
        } catch (error) {
            if (error.code) {
                if (error.code === AUTH_ERROR_CODES.NOT_FOUND) {
                    setErrors({
                        ...errors,
                        email: VALIDATION_MESSAGES.NOT_FOUND('Email')
                    })
                    return
                }
                if (error.code === AUTH_ERROR_CODES.INVALID_EMAIL) {
                    setErrors({
                        ...errors,
                        email: VALIDATION_MESSAGES.INVALID_EMAIL
                    })
                    return
                }
                if (error.code === AUTH_ERROR_CODES.WRONG_PASSWORD) {
                    setErrors({
                        ...errors,
                        password: VALIDATION_MESSAGES.WRONG_PASSWORD
                    })
                    return
                }
            }
            logError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <SplitPageLayout pageName="Login">
            <h1>Hello</h1>
            <p>
                Login to your account or click register if you do not have one.
            </p>

            <form className="mt-10 space-y-7 flex flex-col" onSubmit={login}>
                <div className="space-y-5 flex flex-col">
                    <Input
                        label="Email"
                        type="text"
                        name="email"
                        onChange={setData}
                        errorMessage={errors.email}
                        dataTestId="email-input"
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        onChange={setData}
                        errorMessage={errors.password}
                        dataTestId="password-input"
                    />
                </div>

                <Button
                    label="Login"
                    type="submit"
                    loading={isLoading}
                    dataTestId="login-button"
                />
            </form>

            <small className="mt-3 text-center">
                Don&apos;t have an account? Don&apos;t worry,{' '}
                <Link href="/register">register here</Link>
            </small>
        </SplitPageLayout>
    )
}
