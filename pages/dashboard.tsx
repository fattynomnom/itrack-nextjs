import Button from '../components/Button'
import { Checkbox } from '@chakra-ui/react'
import { DonutChart } from '@tremor/react'
import TopNav from '../components/TopNav'
import { logError } from '../services/LoggingService'
import { logoutUser } from '../services/AuthService'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'
import { useRouter } from 'next/router'

const themeConfig = resolveConfig(tailwindConfig)

const categories = [
    {
        label: 'Food',
        amount: 987,
        color: themeConfig.theme.colors.primary
    },
    {
        label: 'Housing',
        amount: 3241,
        color: themeConfig.theme.colors.secondary
    },
    {
        label: 'Necessities',
        amount: 539,
        color: themeConfig.theme.colors.successlight
    }
]

const transactions = [
    { name: 'Water bill', date: '11/11/2023', amount: '123.10' },
    { name: 'Village Park', date: '11/11/2023', amount: '56.10' },
    { name: 'Movie', date: '11/11/2023', amount: '22' }
]

export default function Dashboard() {
    const router = useRouter()

    const logoutAndRedirect = async () => {
        try {
            await logoutUser()
            router.push('/login')
        } catch (error) {
            logError(error)
        }
    }

    return (
        <div>
            {/* <Button label="Logout" onClick={logoutAndRedirect} /> */}
            <TopNav />

            <div className="space-y-4">
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
                                    <div className="h-44 w-44">
                                        {/* <Doughnut data={data} /> */}
                                        <DonutChart
                                            data={categories}
                                            category="amount"
                                            index="label"
                                            colors={['blue', 'indigo', 'teal']}
                                            valueFormatter={(amount: number) =>
                                                `$${amount}`
                                            }
                                        />
                                    </div>
                                    <ul className="flex-1 px-5 divide-y divide-bglight flex flex-col justify-center">
                                        {categories.map(
                                            ({ label, amount, color }) => (
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
                                                    <span>${amount} (10%)</span>
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
                                        {categories.map(({ label, amount }) => (
                                            <li
                                                key={label}
                                                className="py-3 flex justify-between"
                                            >
                                                <div className="flex space-x-3">
                                                    <Checkbox defaultChecked />
                                                    <span>{label}</span>
                                                </div>
                                                <span>${amount}</span>
                                            </li>
                                        ))}
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

            <style jsx>{`
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
        </div>
    )
}
