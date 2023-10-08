import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js'
import { Cog6ToothIcon, Squares2X2Icon } from '@heroicons/react/24/solid'

import Button from '../components/Button'
import { Checkbox } from '@chakra-ui/react'
import { Doughnut } from 'react-chartjs-2'
import SelectCycle from '../components/SelectCycle'
import { logError } from '../services/LoggingService'
import { logoutUser } from '../services/AuthService'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useState } from 'react'

ChartJS.register(ArcElement, Tooltip)

const themeConfig = resolveConfig(tailwindConfig)

const categories = [
    {
        label: 'Food',
        percentage: 21,
        color: themeConfig.theme.colors.primary
    },
    {
        label: 'Housing',
        percentage: 19,
        color: themeConfig.theme.colors.secondary
    },
    {
        label: 'Necessities',
        percentage: 60,
        color: themeConfig.theme.colors.successlight
    }
]

const data = {
    labels: categories.map(({ label }) => label),
    datasets: [
        {
            label: '%',
            data: categories.map(({ percentage }) => percentage),
            backgroundColor: categories.map(({ color }) => color),
            borderColor: categories.map(({ color }) => color)
        }
    ]
}

const transactions = [
    { name: 'Water bill', date: '11/11/2023', amount: '123.10' },
    { name: 'Village Park', date: '11/11/2023', amount: '56.10' },
    { name: 'Movie', date: '11/11/2023', amount: '22' }
]

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

export default function Dashboard() {
    const router = useRouter()
    const pathname = usePathname()

    const [frequency, setFrequency] = useState('monthly')
    const [monthIndex, setMonthIndex] = useState(1)
    const [yearIndex, setYearIndex] = useState(3)

    const pages = [
        {
            url: '/dashboard',
            icon: <Squares2X2Icon className="h-5 w-5" />,
            label: 'Dashboard'
        },
        {
            url: '/settings',
            icon: <Cog6ToothIcon className="h-5 w-5" />,
            label: 'Settings'
        }
    ]

    const logoutAndRedirect = async () => {
        try {
            await logoutUser()
            router.push('/login')
        } catch (error) {
            logError(error)
        }
    }

    return (
        <main className="flex h-full">
            {/* <Button label="Logout" onClick={logoutAndRedirect} /> */}
            <nav>
                <ul className="nav-list bg-bglight p-10 space-y-3 h-full min-w-[300px] border-r border-bordercolor">
                    {pages.map(page => (
                        <li
                            key={page.url}
                            className={pathname === page.url && 'bg-bgcolor'}
                        >
                            {page.icon}
                            <span>{page.label}</span>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="flex flex-col flex-1">
                <div className="border-b border-bordercolor px-7 py-4 space-x-7 flex items-center">
                    <div className="button-toggle-container rounded-lg p-1 w-fit space-x-2">
                        <button
                            className={`button-toggle ${
                                frequency === 'monthly'
                                    ? 'bg-white'
                                    : 'inactive'
                            }`}
                            onClick={() => setFrequency('monthly')}
                        >
                            Monthly
                        </button>
                        <button
                            className={`button-toggle ${
                                frequency === 'yearly' ? 'bg-white' : 'inactive'
                            }`}
                            onClick={() => setFrequency('yearly')}
                        >
                            Yearly
                        </button>
                    </div>

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

                <div className="flex-1 space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-12 divide-x divide-bordercolor">
                        <div className="col-span-8 p-7">
                            <div className="grid grid-cols-3 gap-5">
                                <div className="card space-y-2">
                                    <div>Income this month</div>
                                    <div className="amount-container">
                                        <p>$7272</p>
                                        <div className="tag danger">+50%</div>
                                    </div>
                                </div>

                                <div className="card space-y-2">
                                    <div>Expense this month</div>
                                    <div className="amount-container">
                                        <p>$7272</p>
                                        <div className="tag success">+50%</div>
                                    </div>
                                </div>

                                <div className="card space-y-2">
                                    <div>Savings this month</div>
                                    <div className="amount-container">
                                        <p>$7272</p>
                                        <div className="tag danger">+50%</div>
                                    </div>
                                </div>

                                <div className="card col-span-full space-y-5">
                                    <div className="font-semibold">
                                        Expense breakdown
                                    </div>
                                    <div className="flex space-x-5">
                                        <div className="max-h-[300px]">
                                            <Doughnut data={data} />
                                        </div>
                                        <ul className="flex-1 px-5 divide-y divide-bglight flex flex-col justify-center">
                                            {categories.map(
                                                ({
                                                    label,
                                                    percentage,
                                                    color
                                                }) => (
                                                    <li
                                                        key={label}
                                                        className="py-3 flex justify-between"
                                                    >
                                                        <div className="flex space-x-3">
                                                            <div
                                                                className="w-5 h-5 rounded-full"
                                                                style={{
                                                                    backgroundColor:
                                                                        color as string
                                                                }}
                                                            />
                                                            <span>{label}</span>
                                                        </div>
                                                        <span>
                                                            $500 ({percentage}%)
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-span-full grid grid-cols-2 gap-5">
                                    <div className="card space-y-5">
                                        <div className="font-semibold">
                                            Monthly commitments
                                        </div>
                                        <ul className="flex-1 divide-y divide-bglight flex flex-col justify-center">
                                            {categories.map(
                                                ({ label, percentage }) => (
                                                    <li
                                                        key={label}
                                                        className="py-3 flex justify-between"
                                                    >
                                                        <div className="flex space-x-3">
                                                            <Checkbox
                                                                defaultChecked
                                                            />
                                                            <span>{label}</span>
                                                        </div>
                                                        <span>
                                                            $500 ({percentage}%)
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>

                                    <div className="card space-y-5">
                                        <div className="font-semibold">
                                            Installments
                                        </div>
                                        <ul className="flex-1 divide-y divide-bglight flex flex-col justify-center">
                                            {categories.map(({ label }) => (
                                                <li
                                                    key={label}
                                                    className="py-3 flex justify-between"
                                                >
                                                    <span>{label}</span>
                                                    <span>
                                                        $4500 (14 / 16 months)
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 p-7 space-y-3">
                            <div className="font-semibold">Transactions</div>
                            <ul className="space-y-4 divide-y divide-bglight">
                                {transactions.map(transaction => (
                                    <li
                                        key={`${transaction.name}-${transaction.date}`}
                                        className="flex items-center pt-4"
                                    >
                                        <div className="flex-1">
                                            <div className="font-semibold">
                                                {transaction.name}
                                            </div>
                                            <div>{transaction.date}</div>
                                        </div>
                                        <div>${transaction.amount}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                html,
                body,
                body > div:first-child,
                div#__next,
                div#__next > main {
                    height: 100%;
                }
            `}</style>

            <style jsx>{`
                .nav-list > li {
                    @apply flex items-center gap-3 cursor-pointer px-5 py-3 rounded-lg font-semibold hover:opacity-50;
                }

                .button-toggle {
                    @apply rounded-lg px-3 py-2 text-xs;
                }

                .button-toggle-container,
                .button-toggle .inactive {
                    @apply bg-bglight hover:bg-bgcolor;
                }

                .card {
                    @apply flex-1 rounded-lg p-7 bg-white border border-bordercolor;
                }

                .amount-container {
                    @apply flex items-center space-x-3;
                }

                .amount-container > p {
                    @apply text-2xl font-semibold;
                }

                .amount-container > .tag {
                    @apply rounded-lg px-2 py-1 text-xs font-semibold h-fit;
                }

                .amount-container > .tag.success {
                    @apply bg-success text-successdark;
                }

                .amount-container > .tag.danger {
                    @apply bg-danger text-dangerdark;
                }
            `}</style>
        </main>
    )
}
