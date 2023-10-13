import { Card, Color, ProgressBar, Text, Title } from '@tremor/react'

import { Checkbox } from '@chakra-ui/react'
import ExpensesSummaryCard from '../components/ExpensesSummaryCard'
import MetricsCard from '../components/MetricsCard'
import TopNav from '../components/TopNav'
import TransactionsList from '../components/TransactionsList'
import { logError } from '../services/LoggingService'
import { logoutUser } from '../services/AuthService'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'
import { useRouter } from 'next/router'

const themeConfig = resolveConfig(tailwindConfig)

const categories = [
    {
        label: 'Electronics',
        amount: 988,
        color: themeConfig.theme.colors.orange[200],
        colorName: 'orange' as Color
    },
    {
        label: 'Travel',
        amount: 321,
        color: themeConfig.theme.colors.yellow[200],
        colorName: 'yellow' as Color
    },
    {
        label: 'Necessities',
        amount: 539,
        color: themeConfig.theme.colors.successlight,
        colorName: 'green' as Color
    },
    {
        label: 'Bills',
        amount: 789,
        color: themeConfig.theme.colors.lime[200],
        colorName: 'lime' as Color
    },
    {
        label: 'Food',
        amount: 987,
        color: themeConfig.theme.colors.primary,
        colorName: 'blue' as Color
    },
    {
        label: 'Housing',
        amount: 3241,
        color: themeConfig.theme.colors.secondary,
        colorName: 'indigo' as Color
    },
    {
        label: 'Hobby',
        amount: 321,
        color: themeConfig.theme.colors.fuchsia[200],
        colorName: 'fuchsia' as Color
    },
    {
        label: 'Pets',
        amount: 398,
        color: themeConfig.theme.colors.rose[200],
        colorName: 'rose' as Color
    }
]

const transactions = [
    {
        name: 'Water bill',
        date: '11/11/2023',
        amount: 123.1,
        category: {
            name: 'Bills',
            color: 'blue' as Color
        }
    },
    {
        name: 'Village Park',
        date: '11/11/2023',
        amount: 56.1,
        category: {
            name: 'Food',
            color: 'indigo' as Color
        }
    },
    {
        name: 'Movie',
        date: '11/11/2023',
        amount: 22,
        category: {
            name: 'Entertainment',
            color: 'green' as Color
        }
    }
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
                <div className="grid grid-cols-12 divide-x">
                    <div className="col-span-8 p-7">
                        <div className="grid grid-cols-3 gap-5">
                            <MetricsCard
                                title="Income"
                                amount={7879}
                                increment={50}
                                color="blue"
                            />
                            <MetricsCard
                                title="Expenses"
                                amount={7879}
                                increment={-23.4}
                                color="indigo"
                            />
                            <MetricsCard
                                title="Savings"
                                amount={7879}
                                increment={8.2}
                                color="green"
                            />

                            <ExpensesSummaryCard categories={categories} />

                            <div className="col-span-full grid grid-cols-2 gap-5">
                                <Card>
                                    <Title>Monthly commitments</Title>
                                    <ul className="flex-1 divide-y flex flex-col justify-center mt-5">
                                        {categories.map(({ label, amount }) => (
                                            <li
                                                key={label}
                                                className="py-3 flex justify-between"
                                            >
                                                <div className="flex space-x-3">
                                                    <Checkbox defaultChecked />
                                                    <Text>{label}</Text>
                                                </div>
                                                <Text className="tabular-nums">
                                                    $ {amount}
                                                </Text>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>

                                <Card>
                                    <Title>Installments</Title>
                                    <ul className="flex-1 divide-y flex flex-col justify-center mt-2">
                                        {categories.map(
                                            ({ label, colorName }) => (
                                                <li
                                                    key={label}
                                                    className="pt-3 pb-4"
                                                >
                                                    <Title>{label}</Title>
                                                    <div className="flex justify-between mb-2">
                                                        <Text>
                                                            $ 9012 / month
                                                            &bull; 14 / 16
                                                            months
                                                        </Text>
                                                        <Text className="tabular-nums">
                                                            $ 20000
                                                        </Text>
                                                    </div>
                                                    <ProgressBar
                                                        value={(14 / 16) * 100}
                                                        color={
                                                            colorName as Color
                                                        }
                                                    />
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <TransactionsList transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    )
}
