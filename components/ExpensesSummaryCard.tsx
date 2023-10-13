import { Card, Color, DonutChart, Text, Title } from '@tremor/react'

export default function ExpensesSummaryCard({
    categories
}: {
    categories: {
        label: string
        amount: number
        color: string
        colorName: Color
    }[]
}) {
    return (
        <Card className="col-span-full">
            <Title>Expenses breakdown</Title>
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
                <ul className="flex-1 px-5 divide-y flex flex-col justify-center">
                    {categories.map(({ label, amount, color }) => (
                        <li key={label} className="py-3 flex justify-between">
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
            </div>
        </Card>
    )
}
