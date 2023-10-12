import { ReactNode } from 'react'
import { Text } from '@tremor/react'

interface Button {
    label: string | ReactNode
    buttonValue: string | number | boolean
}

export default function ButtonToggle({
    values,
    value,
    variant = 'm',
    onChanged
}: {
    values: [Button, Button]
    value: string | number | boolean
    variant?: 'xs' | 'm'
    onChanged: (value: string | number | boolean) => void
}) {
    return (
        <div className="button-toggle-container rounded-lg p-1 w-fit space-x-2 shrink-0">
            {values.map(({ label, buttonValue }, index) => (
                <button
                    key={index}
                    className={`button-toggle ${
                        value === buttonValue
                            ? 'bg-tremor-background'
                            : 'inactive'
                    }`}
                    onClick={() => onChanged(buttonValue)}
                >
                    {typeof label === 'string' ? (
                        <Text
                            className={variant === 'm' ? 'text-sm' : 'text-xs'}
                        >
                            {label}
                        </Text>
                    ) : (
                        label
                    )}
                </button>
            ))}

            <style jsx>{`
                .button-toggle {
                    @apply rounded-lg px-3 py-2 h-full;
                }

                .button-toggle-container,
                .button-toggle .inactive {
                    @apply bg-tremor-background-subtle hover:bg-bgcolor;
                }
            `}</style>
        </div>
    )
}
