export default function Button({
    label,
    type = 'button',
    disabled = false,
    loading = false,
    dataTestId = '',
    onClick
}: {
    label: string
    type?: 'button' | 'submit'
    disabled?: boolean
    loading?: boolean
    dataTestId?: string
    onClick?: () => void
}) {
    return (
        <button
            type={type}
            className="px-4 py-3 bg-primary rounded-lg text-white text-sm font-bold tracking-wider bg-gradient-to-r from-secondary to-primary disabled:opacity-50 flex justify-center"
            onClick={onClick}
            disabled={loading || disabled}
            data-testid={dataTestId}
        >
            {loading && (
                <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            )}
            {label}
        </button>
    )
}
