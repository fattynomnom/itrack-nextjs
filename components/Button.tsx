export default function Button({
    label,
    type = 'button',
    onClick
}: {
    label: string
    type?: 'button' | 'submit'
    onClick?: () => void
}) {
    return (
        <button
            type={type}
            className="text-center px-4 py-3 bg-primary rounded-lg text-white text-sm font-bold tracking-wider bg-gradient-to-r from-secondary to-primary"
            onClick={onClick}
        >
            {label}
        </button>
    )
}
