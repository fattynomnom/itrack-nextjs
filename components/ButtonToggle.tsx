import { Text } from '@tremor/react'

interface Button {
    label: string
    buttonValue: string | number | boolean
}

export default function ButtonToggle({
    values,
    value,
    onChanged
}: {
    values: [Button, Button]
    value: string | number | boolean
    onChanged: (value: string | number | boolean) => void
}) {
    return (
        <div className="button-toggle-container rounded-lg p-1 w-fit space-x-2">
            {values.map(({ label, buttonValue }) => (
                <button
                    key={label}
                    className={`button-toggle ${
                        value === buttonValue
                            ? 'bg-tremor-background'
                            : 'inactive'
                    }`}
                    onClick={() => onChanged(buttonValue)}
                >
                    <Text>{label}</Text>
                </button>
            ))}

            <style jsx>{`
                .button-toggle {
                    @apply rounded-lg px-3 py-2;
                }

                .button-toggle-container,
                .button-toggle .inactive {
                    @apply bg-tremor-background-subtle hover:bg-bgcolor;
                }
            `}</style>
        </div>
    )
}
