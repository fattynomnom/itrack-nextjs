import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import {
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    useDisclosure
} from '@chakra-ui/react'

import { Text } from '@tremor/react'

export default function SelectCycle({
    value,
    array,
    onChanged
}: {
    value: number
    array: (string | number)[]
    onChanged: (value: number) => void
}) {
    const { isOpen, onToggle, onClose } = useDisclosure()

    const toggleValue = (toMonth: -1 | 1) => {
        const newIndex = value + toMonth
        if (newIndex < 0) {
            onChanged(array.length - 1)
        } else if (newIndex >= array.length) {
            onChanged(0)
        } else {
            onChanged(newIndex)
        }
    }

    return (
        <div className="flex items-center cursor-pointer space-x-1">
            <ChevronLeftIcon
                className="h-5 w-5"
                onClick={() => toggleValue(-1)}
            />
            <Popover isOpen={isOpen} onClose={onClose}>
                <PopoverTrigger>
                    <button
                        className="rounded-lg px-3 py-2 hover:bg-tremor-background-subtle"
                        onClick={onToggle}
                    >
                        <Text>{array[value]}</Text>
                    </button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverBody>
                        <div className="max-w-[300px] grid grid-cols-3 gap-1">
                            {array.map((text, index) => (
                                <button
                                    key={text}
                                    className={`bg-tremor-background hover:bg-tremor-background-subtle rounded-lg px-3 py-2 text-xs ${
                                        value === index && 'opacity-50'
                                    }`}
                                    onClick={() => {
                                        onToggle()
                                        onChanged(index)
                                    }}
                                >
                                    <Text>{text}</Text>
                                </button>
                            ))}
                        </div>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
            <ChevronRightIcon
                className="h-5 w-5"
                onClick={() => toggleValue(1)}
            />
        </div>
    )
}
