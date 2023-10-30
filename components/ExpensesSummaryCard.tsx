import { Button, Card, Color, DonutChart, Text, Title } from '@tremor/react'

import { Category } from '../types/Category.d'
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'

export default function ExpensesSummaryCard({
    categories
}: {
    categories: Category[]
}) {
    const router = useRouter()

    return (
        <Card className="col-span-full">
            <Title>Top 3 expense categories</Title>
            <div className="flex space-x-5 mt-5">
                <div className="h-44 w-44">
                    <DonutChart
                        data={categories}
                        category="amount"
                        index="label"
                        colors={categories.map(({ colorName }) => colorName)}
                        valueFormatter={(amount: number) => `$ ${amount} (10%)`}
                    />
                </div>
                <div className="flex-1 px-5 flex flex-col justify-center space-y-3">
                    <ul className="divide-y">
                        {categories
                            .slice(0, 3)
                            .map(({ label, amount, color }) => (
                                <li
                                    key={label}
                                    className="py-3 flex justify-between"
                                >
                                    <div className="flex space-x-3">
                                        <div
                                            className="w-5 h-5 rounded-full"
                                            style={{
                                                backgroundColor: color as string
                                            }}
                                        />
                                        <Text>{label}</Text>
                                    </div>
                                    <Text className="tabular-nums">
                                        $ {amount} (10%)
                                    </Text>
                                </li>
                            ))}
                    </ul>
                    <div className="text-right">
                        <Button
                            variant="light"
                            size="xs"
                            iconPosition="right"
                            icon={ChevronDoubleRightIcon}
                            onClick={() => router.push('/budget')}
                        >
                            View all
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}
