import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { AUTH_ERROR_CODES, loginUser } from '../../services/AuthService'
import '@testing-library/jest-dom'
import { VALIDATION_MESSAGES } from '../../utils/validation'
import { act } from 'react-dom/test-utils'
import mocks from '../../jest.setup'
import Login from '../../pages/login'

// #region reusable functions
const clickLoginButton = () => screen.getByTestId('login-button').click()

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
jest.mock('../../services/AuthService')
const loginUserMock = loginUser as jest.MockedFunction<typeof loginUser>
// #endregion

describe('Login', () => {
    it('displays required fields validation errors', () => {
        render(<Login />)

        act(clickLoginButton)

        expectErrorToBeDisplayedAs(
            'email-input-error-message',
            VALIDATION_MESSAGES.REQUIRED_FIELD
        )
        expectErrorToBeDisplayedAs(
            'password-input-error-message',
            VALIDATION_MESSAGES.REQUIRED_FIELD
        )
    })

    it('displays email type error', async () => {
        render(<Login />)

        act(() => {
            setInputValue('email-input', 'wrong email')
            setInputValue('password-input', 'password123')

            clickLoginButton()
        })

        expectErrorToBeDisplayedAs(
            'email-input-error-message',
            VALIDATION_MESSAGES.INVALID_EMAIL
        )
    })

    it('displays email not found error', async () => {
        render(<Login />)

        act(() => {
            setInputValue('email-input', 'mail@mail.com')
            setInputValue('password-input', 'password123')

            loginUserMock.mockRejectedValue({
                code: AUTH_ERROR_CODES.NOT_FOUND
            })
            clickLoginButton()
        })

        await waitFor(() => {
            expectErrorToBeDisplayedAs(
                'email-input-error-message',
                VALIDATION_MESSAGES.NOT_FOUND('Email')
            )
        })
    })

    it('displays wrong password error', async () => {
        render(<Login />)

        act(() => {
            setInputValue('email-input', 'mail@mail.com')
            setInputValue('password-input', 'password123')

            loginUserMock.mockRejectedValue({
                code: AUTH_ERROR_CODES.WRONG_PASSWORD
            })
            clickLoginButton()
        })

        await waitFor(() => {
            expectErrorToBeDisplayedAs(
                'password-input-error-message',
                VALIDATION_MESSAGES.WRONG_PASSWORD
            )
        })
    })

    it('can login user', async () => {
        render(<Login />)

        act(() => {
            setInputValue('email-input', 'mail@mail.com')
            setInputValue('password-input', 'password123')

            loginUserMock.mockResolvedValue({
                uid: '',
                name: '',
                email: ''
            })

            clickLoginButton()
        })

        await waitFor(() => {
            expect(mocks.useRouterMock.push).toHaveBeenCalledWith('/dashboard')
        })
    })
})
