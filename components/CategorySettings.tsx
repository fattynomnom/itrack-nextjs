import { Button, Card, Color, Text, TextInput } from '@tremor/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { SlideFade, useDisclosure } from '@chakra-ui/react'

import ButtonToggle from './ButtonToggle'
import tailwindConfig from '../tailwind.config'
import { useState } from 'react'

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
            <ul>
                {categories.map(({ label, color }) => (
                    <li
                        key={label}
                        className="px-2 py-3 flex space-x-3 rounded-tremor-default hover:bg-tremor-background-muted"
                    >
                        <div
                            className="w-5 h-5 rounded-full"
                            style={{
                                backgroundColor: color as string
                            }}
                        />
                        <Text>{label}</Text>
                    </li>
                ))}
            </ul>
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
                        <div className="flex justify-between">
                            {Object.keys(tailwindConfig.defaultColors).map(
                                colorName => (
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
                                                    tailwindConfig
                                                        .defaultColors[
                                                        colorName
                                                    ][500]
                                            }}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                        <Button className="w-full">Add</Button>
                    </div>
                </Card>
            </SlideFade>
        </div>
    )
}
