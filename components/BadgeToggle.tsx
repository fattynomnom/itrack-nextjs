import { Badge, Color } from '@tremor/react'

import { ReactNode } from 'react'
import tailwindConfig from '../tailwind.config'

export default function BadgeToggle({
    children,
    color,
    selected = false,
    onClick
}: {
    children: ReactNode
    color: Color
    selected?: boolean
    onClick: () => void
}) {
    return (
        <div
            className={`shrink-0 cursor-pointer px-1 pb-0.5 rounded-tremor-full ${
                selected && 'border'
            }`}
            style={{ borderColor: tailwindConfig.defaultColors[color][500] }}
            onClick={onClick}
        >
            <Badge color={color} className="cursor-pointer">
                {children}
            </Badge>
        </div>
    )
}
