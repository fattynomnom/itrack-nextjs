import { BadgeDelta, Card, Color, Metric, Text } from '@tremor/react'

export default function MetricsCard({
    title,
    amount,
    increment,
    color
}: {
    title: string
    amount: number
    increment: number
    color: Color
}) {
    return (
        <Card decoration="top" decorationColor={color}>
            <Text>{title}</Text>
            <div className="flex space-x-3 items-end">
                <Metric>$ {amount}</Metric>
                <BadgeDelta
                    className="h-fit"
                    deltaType={
                        increment > 0 ? 'moderateIncrease' : 'moderateDecrease'
                    }
                    size="xs"
                >
                    {increment}%
                </BadgeDelta>
            </div>
        </Card>
    )
}
