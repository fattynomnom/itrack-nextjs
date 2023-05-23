import Link from 'next/link'
import Input from '../components/Input'
import Button from '../components/Button'
import SplitPageLayout from '../components/SplitPageLayout'
import { ChangeEvent, FormEvent, useState } from 'react'
import { User } from '../types/User'
import {
    VALIDATION_MESSAGES,
    getEmailError,
    getMinCharactersError,
    isRequiredFieldsFilled
} from '../utils/validation'
import { AUTH_ERROR_CODES, createUser } from '../services/FirebaseAuthService'
import { logError } from '../services/LoggingService'
import { useRouter } from 'next/router'

interface FormData extends Pick<User, 'name' | 'email'> {
    password: string
    reenteredPassword: string
}

export default function Login() {
    const router = useRouter()

    const defaultFormData: FormData = {
        name: '',
        email: '',
        password: '',
        reenteredPassword: ''
    }

    const PASSWORD_RULE = VALIDATION_MESSAGES.MIN_CHARACTERS(6, 'Password')

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
            isRequiredFieldsFilled<FormData>(formData, [
                'email',
                'password',
                'reenteredPassword'
            ])
        if (hasError) {
            setErrors(requiredErrors)
            return false
        }

        const emailError = getEmailError(formData.email)
        if (emailError) {
            setErrors({ ...errors, email: emailError })
            return false
        }

        if (getMinCharactersError(formData.password, 6)) {
            setErrors({ ...errors, password: PASSWORD_RULE })
            return false
        }

        if (formData.password !== formData.reenteredPassword) {
            setErrors({
                ...errors,
                reenteredPassword: VALIDATION_MESSAGES.PASSWORD_DONT_MATCH
            })
            return false
        }

        return true
    }

    const register = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!validate()) return

        setIsLoading(true)

        const { email, password } = formData
        try {
            await createUser(email, password)
            router.push('/dashboard')
        } catch (error) {
            if (error.code) {
                if (error.code === AUTH_ERROR_CODES.EMAIL_IN_USE) {
                    setErrors({
                        ...errors,
                        email: VALIDATION_MESSAGES.FIELD_IN_USE('Email')
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
                if (error.code === AUTH_ERROR_CODES.WEAK_PASSWORD) {
                    setErrors({ ...errors, password: PASSWORD_RULE })
                    return
                }
            }
            logError(error)
        } finally {
            setIsLoading(false)
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
                        dataTestId="name-input"
                    />
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
                        hintMessage={!errors.password && PASSWORD_RULE}
                        dataTestId="password-input"
                    />
                    <Input
                        label="Re-enter password"
                        type="password"
                        name="reenteredPassword"
                        onChange={setData}
                        errorMessage={errors.reenteredPassword}
                        dataTestId="confirm-password-input"
                    />
                </div>

                <Button
                    label="Register an account"
                    type="submit"
                    loading={isLoading}
                    dataTestId="register-button"
                />
            </form>

            <small className="mt-3 text-center">
                Already have an account? <Link href="/login">Login here</Link>
            </small>
        </SplitPageLayout>
    )
}
