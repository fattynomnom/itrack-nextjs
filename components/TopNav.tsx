import {
    Button,
    Color,
    NumberInput,
    SearchSelect,
    SearchSelectItem
} from '@tremor/react'
import { CurrencyDollarIcon, PlusIcon } from '@heroicons/react/24/solid'
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from '@chakra-ui/react'

import ButtonToggle from '../components/ButtonToggle'
import SelectCycle from '../components/SelectCycle'
import { useState } from 'react'

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const years = [2020, 2021, 2022, 2023]

export default function TopNav({
    categories
}: {
    categories: {
        label: string
        amount: number
        color: string
        colorName: Color
    }[]
}) {
    const [frequency, setFrequency] = useState('monthly')
    const [monthIndex, setMonthIndex] = useState(1)
    const [yearIndex, setYearIndex] = useState(3)

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className="border-b px-7 py-4 space-x-7 flex items-center justify-between">
            <div className="flex items-center space-x-7">
                <ButtonToggle
                    values={[
                        { label: 'Monthly', buttonValue: 'monthly' },
                        { label: 'Yearly', buttonValue: 'yearly' }
                    ]}
                    value={frequency}
                    onChanged={value => setFrequency(value as string)}
                />

                {frequency === 'monthly' && (
                    <SelectCycle
                        value={monthIndex}
                        array={months}
                        onChanged={setMonthIndex}
                    />
                )}

                {frequency === 'yearly' && (
                    <SelectCycle
                        value={yearIndex}
                        array={years}
                        onChanged={setYearIndex}
                    />
                )}
            </div>

            <Button variant="secondary" icon={PlusIcon} onClick={onOpen}>
                Record transaction
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Record transaction</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="space-y-4">
                            <NumberInput
                                icon={CurrencyDollarIcon}
                                placeholder="Amount"
                                min="0"
                            />
                            <SearchSelect>
                                {categories.map(({ label, color }) => (
                                    <SearchSelectItem key={label} value={label}>
                                        <div className="flex space-x-3">
                                            <div
                                                className="h-5 w-5 rounded-full"
                                                style={{
                                                    backgroundColor: color
                                                }}
                                            />
                                            <span>{label}</span>
                                        </div>
                                    </SearchSelectItem>
                                ))}
                            </SearchSelect>
                            <Button
                                variant="secondary"
                                className="w-full"
                                onClick={onClose}
                            >
                                Submit
                            </Button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}
