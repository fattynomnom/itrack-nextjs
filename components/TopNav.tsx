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

export default function TopNav() {
    const [frequency, setFrequency] = useState('monthly')
    const [monthIndex, setMonthIndex] = useState(1)
    const [yearIndex, setYearIndex] = useState(3)

    return (
        <div className="border-b px-7 py-4 space-x-7 flex items-center">
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
    )
}
