import '@testing-library/jest-dom'
import {
    VALIDATION_MESSAGES,
    getEmailError,
    getMinCharactersError,
    isRequiredFieldsFilled
} from '../../utils/validation'

interface TestFormData {
    name: string
    email: string
}

describe('Helper - validation', () => {
    it('returns required fields error message', () => {
        const formData: TestFormData = { name: '', email: '' }
        const result = isRequiredFieldsFilled<TestFormData>(formData, [
            'name',
            'email'
        ])

        expect(result.hasError).toBe(true)
        expect(result.errors.name).toBe(VALIDATION_MESSAGES.REQUIRED_FIELD)
        expect(result.errors.email).toBe(VALIDATION_MESSAGES.REQUIRED_FIELD)
    })

    it('does not return required fields error message', () => {
        const formData: TestFormData = { name: 'testing', email: '' }
        const result = isRequiredFieldsFilled<TestFormData>(formData, ['name'])

        expect(result.hasError).toBe(false)
        expect(result.errors.name).toBe('')
        expect(result.errors.email).toBe('')
    })

    it('returns invalid email message', () => {
        const result = getEmailError('thisisnot an email')
        expect(result).toBe(VALIDATION_MESSAGES.INVALID_EMAIL)
    })

    it('does not return invalid email message', () => {
        const result = getEmailError('mail@mail.com')
        expect(result).toBe('')
    })

    it('returns min characters not met error', () => {
        const result = getMinCharactersError('123', 4)
        expect(result).toBe(VALIDATION_MESSAGES.MIN_CHARACTERS(4))
    })

    it('does not return min characters not met error', () => {
        const result = getMinCharactersError('1234', 4)
        expect(result).toBe('')
    })
})
