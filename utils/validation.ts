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
            errors[field] = 'This is a required field'
        }
    }

    return { hasError, errors }
}

export const isEmail = (email: string): string => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).length > 0
        ? ''
        : 'Please enter a valid email address'
}
