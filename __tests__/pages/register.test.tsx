import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Registration from '../../pages/register'
import {
    AUTH_ERROR_CODES,
    createUser
} from '../../services/FirebaseAuthService'
import '@testing-library/jest-dom'
import { VALIDATION_MESSAGES } from '../../utils/validation'
import { act } from 'react-dom/test-utils'

// #region reusable functions
const clickRegisterButton = () => screen.getByTestId('register-button').click()

const expectErrorToBeDisplayedAs = (testId: string, message: string) => {
    const el = screen.getByTestId(testId)
    expect(el).toBeInTheDocument()
    expect(el.innerHTML).toBe(message)
}

const setInputValue = (testId: string, value: string) => {
    const input = screen.getByTestId(testId)
    fireEvent.change(input, {
        target: { value }
    })
}
// #endregion

// #region mocking
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()
useRouter.mockImplementation(() => ({ push }))

jest.mock('../../services/FirebaseAuthService')
const createUserMock = createUser as jest.MockedFunction<typeof createUser>
// #endregion

describe('Register', () => {
    it('displays required fields validation errors', () => {
        render(<Registration />)

        act(clickRegisterButton)

        expectErrorToBeDisplayedAs(
            'email-input-error-message',
            VALIDATION_MESSAGES.REQUIRED_FIELD
        )
    })

    it('displays email type error', async () => {
        render(<Registration />)

        act(() => {
            setInputValue('email-input', 'wrong email')

            const password = 'password123'
            setInputValue('password-input', password)
            setInputValue('confirm-password-input', password)

            clickRegisterButton()
        })

        expectErrorToBeDisplayedAs(
            'email-input-error-message',
            VALIDATION_MESSAGES.INVALID_EMAIL
        )
    })

    it('displays weak password error', async () => {
        render(<Registration />)

        act(() => {
            setInputValue('email-input', 'mail@mail.com')

            const password = 'pass'
            setInputValue('password-input', password)
            setInputValue('confirm-password-input', password)

            clickRegisterButton()
        })

        expectErrorToBeDisplayedAs(
            'password-input-error-message',
            VALIDATION_MESSAGES.MIN_CHARACTERS(6, 'Password')
        )
    })

    it('displays mismatch password error', async () => {
        render(<Registration />)

        act(() => {
            setInputValue('email-input', 'mail@mail.com')
            setInputValue('password-input', 'password123')
            setInputValue('confirm-password-input', 'password124')

            clickRegisterButton()
        })

        expectErrorToBeDisplayedAs(
            'confirm-password-input-error-message',
            VALIDATION_MESSAGES.PASSWORD_DONT_MATCH
        )
    })

    it('displays email in use error', async () => {
        render(<Registration />)

        act(() => {
            setInputValue('email-input', 'mad@mail.com')

            const password = 'password123'
            setInputValue('password-input', password)
            setInputValue('confirm-password-input', password)

            createUserMock.mockRejectedValue({
                code: AUTH_ERROR_CODES.EMAIL_IN_USE
            })
            clickRegisterButton()
        })

        await waitFor(() => {
            expectErrorToBeDisplayedAs(
                'email-input-error-message',
                VALIDATION_MESSAGES.FIELD_IN_USE('Email')
            )
        })
    })

    it('can register user', async () => {
        render(<Registration />)

        act(() => {
            setInputValue('email-input', 'mad@mail.com')

            const password = 'password123'
            setInputValue('password-input', password)
            setInputValue('confirm-password-input', password)

            createUserMock.mockResolvedValue({
                uid: '',
                name: '',
                email: ''
            })

            clickRegisterButton()
        })

        await waitFor(() => {
            expect(push).toHaveBeenCalledWith('/dashboard')
        })
    })
})
