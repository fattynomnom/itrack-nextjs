export default function ButtonToggle({
    value,
    onChanged
}: {
    value: string | number | boolean
    onChanged: (value: string | number | boolean) => void
}) {
    return (
        <div className="button-toggle-container rounded-lg p-1 w-fit space-x-2">
            <button
                className={`button-toggle ${
                    value === 'monthly' ? 'bg-white' : 'inactive'
                }`}
                onClick={() => onChanged('monthly')}
            >
                Monthly
            </button>
            <button
                className={`button-toggle ${
                    value === 'yearly' ? 'bg-white' : 'inactive'
                }`}
                onClick={() => onChanged('yearly')}
            >
                Yearly
            </button>

            <style jsx>{`
                .button-toggle {
                    @apply rounded-lg px-3 py-2 text-xs;
                }

                .button-toggle-container,
                .button-toggle .inactive {
                    @apply bg-bglight hover:bg-bgcolor;
                }
            `}</style>
        </div>
    )
}
