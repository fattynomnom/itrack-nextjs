import {
    Button,
    Card,
    Color,
    NumberInput,
    Subtitle,
    Text,
    TextInput
} from '@tremor/react'
import {
    ChevronDownIcon,
    ChevronUpIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/solid'
import { SlideFade, useDisclosure } from '@chakra-ui/react'

import Badge from './Badge'
import ButtonToggle from './ButtonToggle'
import tailwindConfig from '../tailwind.config'
import { useState } from 'react'

const defaultColors = [
    'orange',
    'yellow',
    'green',
    'lime',
    'blue',
    'indigo',
    'fuchsia',
    'rose'
]

export default function CategorySettings({
    categories
}: {
    categories: {
        label: string
        amount: number
        color: string
        colorName: Color
    }[]
}) {
    const [categoryType, setCategoryType] = useState('wants')
    const [color, setColor] = useState('orange')

    const {
        isOpen: isAddOpen,
        onOpen: onAddOpen,
        onClose: onAddClose
    } = useDisclosure()

    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <div className="text-right font-semibold">
                    <Subtitle>Allocation</Subtitle>
                </div>
                <ul>
                    {categories.map(({ label, color, amount }, index) => (
                        <li
                            key={label}
                            className="cursor-pointer px-2 py-3 flex justify-between rounded-tremor-default hover:bg-tremor-background-muted"
                        >
                            <div className="flex items-center space-x-3">
                                <div
                                    className="w-5 h-5 rounded-full"
                                    style={{
                                        backgroundColor: color as string
                                    }}
                                />
                                <Text>{label}</Text>
                            </div>
                            <div className="flex space-x-3">
                                <Badge color="gray">
                                    {index % 2 === 1 ? 'Wants' : 'Needs'}
                                </Badge>
                                <div className="min-w-[70px] text-right">
                                    <Text>$ {amount}</Text>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="text-center">
                <Button
                    variant="light"
                    size="xs"
                    icon={isAddOpen ? ChevronUpIcon : ChevronDownIcon}
                    iconPosition="right"
                    onClick={() => (isAddOpen ? onAddClose() : onAddOpen())}
                >
                    Add category
                </Button>
            </div>
            <SlideFade in={isAddOpen}>
                <Card>
                    <div className="space-y-4">
                        <div className="flex space-x-3">
                            <TextInput
                                placeholder="Category name"
                                className="shrink"
                            />
                            <ButtonToggle
                                values={[
                                    {
                                        label: 'Wants',
                                        buttonValue: 'wants'
                                    },
                                    {
                                        label: 'Needs',
                                        buttonValue: 'needs'
                                    }
                                ]}
                                value={categoryType}
                                variant="xs"
                                onChanged={value =>
                                    setCategoryType(value as string)
                                }
                            />
                        </div>
                        <NumberInput
                            icon={CurrencyDollarIcon}
                            placeholder="Budget allocation"
                            min="0"
                        />
                        <div className="flex justify-between">
                            {defaultColors.map(colorName => (
                                <div
                                    key={colorName}
                                    className={`p-1 rounded-full cursor-pointer ${
                                        color === colorName && 'border'
                                    }`}
                                    style={{
                                        borderColor:
                                            tailwindConfig.defaultColors[
                                                colorName
                                            ][500]
                                    }}
                                    onClick={() => setColor(colorName)}
                                >
                                    <div
                                        className="w-5 h-5 rounded-full"
                                        style={{
                                            backgroundColor:
                                                tailwindConfig.defaultColors[
                                                    colorName
                                                ][500]
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        <Button variant="secondary" className="w-full">
                            Add
                        </Button>
                    </div>
                </Card>
            </SlideFade>
        </div>
    )
}
