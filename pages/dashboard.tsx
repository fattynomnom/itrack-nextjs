import {
    Card,
    Color,
    DonutChart,
    ProgressBar,
    Subtitle,
    Text,
    Title
} from '@tremor/react'

import Button from '../components/Button'
import { Checkbox } from '@chakra-ui/react'
import MetricsCard from '../components/MetricsCard'
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
        color: themeConfig.theme.colors.primary,
        colorName: 'blue'
    },
    {
        label: 'Housing',
        amount: 3241,
        color: themeConfig.theme.colors.secondary,
        colorName: 'indigo'
    },
    {
        label: 'Necessities',
        amount: 539,
        color: themeConfig.theme.colors.successlight,
        colorName: 'green'
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

                            <Card className="col-span-full">
                                <Title>Expenses breakdown</Title>
                                <div className="flex space-x-5 mt-5">
                                    <div className="h-44 w-44">
                                        <DonutChart
                                            data={categories}
                                            category="amount"
                                            index="label"
                                            colors={['blue', 'indigo', 'green']}
                                            valueFormatter={(amount: number) =>
                                                `$ ${amount}`
                                            }
                                        />
                                    </div>
                                    <ul className="flex-1 px-5 divide-y flex flex-col justify-center">
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
                                                        <Text>{label}</Text>
                                                    </div>
                                                    <Text className="tabular-nums">
                                                        $ {amount} (10%)
                                                    </Text>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </Card>

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
                    <div className="col-span-4 p-7 space-y-3">
                        <Title>Transactions</Title>
                        <ul className="space-y-4 divide-y">
                            {transactions.map(transaction => (
                                <li
                                    key={`${transaction.name}-${transaction.date}`}
                                    className="flex items-center pt-4"
                                >
                                    <div className="flex-1">
                                        <Text>{transaction.name}</Text>
                                        <Subtitle>{transaction.date}</Subtitle>
                                    </div>
                                    <div className="tabular-nums">
                                        $ {transaction.amount}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
