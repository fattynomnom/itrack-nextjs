import { Color } from '@tremor/react'
import { ReactNode } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import colors from 'tailwindcss/colors'

export default function Badge({
    children,
    color,
    selectable = false,
    selected = false,
    className = '',
    size = 'sm',
    closable = false,
    onClick
}: {
    children: ReactNode
    color: Color
    selectable?: boolean
    selected?: boolean
    className?: string
    size?: 'sm' | 'md'
    closable?: boolean
    onClick?: () => void
}) {
    const bgColorValue = colors[color][100]
    const textColorValue = colors[color][700]

    return (
        <div
            className={`shrink-0 rounded-full h-fit badge-border ${
                selectable ? 'cursor-pointer p-1' : ''
            } ${selectable && selected ? 'border' : ''} ${className}`}
            style={{ borderColor: bgColorValue }}
            onClick={onClick}
        >
            <div
                className={`flex items-center space-x-1 text-xs px-2 rounded-full w-fit ${
                    selectable || closable ? 'cursor-pointer' : ''
                } ${size === 'sm' ? 'py-0.5' : 'py-1'}`}
                style={{
                    backgroundColor: bgColorValue,
                    color: textColorValue
                }}
            >
                <span className="shrink-0">{children}</span>
                {closable && <XMarkIcon className="h-3 w-3" />}
            </div>
        </div>
    )
}
