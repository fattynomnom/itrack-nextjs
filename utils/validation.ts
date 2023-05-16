export const VALIDATION_MESSAGES = {
    REQUIRED_FIELD: 'This is a required field',
    INVALID_EMAIL: 'Please enter a valid email address',
    PASSWORD_DONT_MATCH: 'Password does not match',
    WRONG_PASSWORD: 'Incorrect password',
    NOT_FOUND: (resource: string) => `${resource} not found`,
    MIN_CHARACTERS: (charsCount: number, field: string = 'Value') =>
        `${field} should be at least ${charsCount} characters long`,
    FIELD_IN_USE: (field: string) => `${field} is already in use`
}

export const isRequiredFieldsFilled = <FormData>(
    data: FormData,
    requiredFields: Array<keyof FormData>
): {
    hasError: boolean
    errors: Record<keyof FormData, string>
} => {
    const errors: Record<keyof FormData, string> = Object.fromEntries(
        Object.keys(data).map(key => [key, ''])
    ) as Record<keyof FormData, string>
    let hasError = false

    for (const field of requiredFields) {
        if (!data[field]) {
            hasError = true
            errors[field] = VALIDATION_MESSAGES.REQUIRED_FIELD
        }
    }

    return { hasError, errors }
}

export const getEmailError = (email: string): string => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).length > 0
        ? ''
        : VALIDATION_MESSAGES.INVALID_EMAIL
}

export const getMinCharactersError = (input: string, numOfChars: number) => {
    return input.length >= numOfChars
        ? ''
        : VALIDATION_MESSAGES.MIN_CHARACTERS(numOfChars)
}
