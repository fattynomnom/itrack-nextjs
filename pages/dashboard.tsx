import { Card, Color, ProgressBar, Text, Title } from '@tremor/react'

import { Category } from '../types/Category.d'
import { Checkbox } from '@chakra-ui/react'
import ExpensesSummaryCard from '../components/ExpensesSummaryCard'
import MetricsCard from '../components/MetricsCard'
import TransactionsList from '../components/TransactionsList'
import axios from 'axios'
import { logError } from '../services/LoggingService'
import { logoutUser } from '../services/AuthService'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

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

export default function Dashboard({ categories }: { categories: Category[] }) {
    const router = useRouter()

    const logoutAndRedirect = async () => {
        try {
            await logoutUser()
            router.push('/login')
        } catch (error) {
            logError(error)
        }
    }

    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get('/api/users')
            console.log(response)
        }
        getUsers()
    }, [])

    return (
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
                                    {categories.map(({ label, colorName }) => (
                                        <li key={label} className="pt-3 pb-4">
                                            <Title>{label}</Title>
                                            <div className="flex justify-between mb-2">
                                                <Text>
                                                    $ 9012 / month &bull; 14 /
                                                    16 months
                                                </Text>
                                                <Text className="tabular-nums">
                                                    $ 20000
                                                </Text>
                                            </div>
                                            <ProgressBar
                                                value={(14 / 16) * 100}
                                                color={colorName as Color}
                                            />
                                        </li>
                                    ))}
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
    )
}
