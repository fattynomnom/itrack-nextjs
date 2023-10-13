import {
    BarChart,
    Button,
    Card,
    Color,
    DonutChart,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Text,
    Title
} from '@tremor/react'
import {
    ChartBarIcon,
    ChartPieIcon,
    PencilIcon
} from '@heroicons/react/24/solid'

import ButtonToggle from './ButtonToggle'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'

export default function ExpensesDetailsCard({
    filters,
    categories,
    setFilters,
    onOpenCategories
}: {
    filters: string[]
    categories: {
        label: string
        amount: number
        color: string
        colorName: Color
    }[]
    setFilters: (value: string[]) => void
    onOpenCategories: () => void
}) {
    const toast = useToast()

    const [chart, setChart] = useState('donut')

    return (
        <Card>
            <div className="space-y-5">
                <Title>Expenses</Title>
                <div className="mx-auto">
                    {chart === 'donut' ? (
                        <DonutChart
                            className="h-[300px]"
                            data={categories}
                            category="amount"
                            index="label"
                            colors={categories.map(
                                ({ colorName }) => colorName
                            )}
                            valueFormatter={(amount: number) =>
                                `$ ${amount} (10%)`
                            }
                        />
                    ) : (
                        <BarChart
                            className="h-[300px] py-5"
                            data={categories.map(category => ({
                                ...category,
                                Amount: category.amount
                            }))}
                            index="label"
                            colors={['indigo', 'blue', 'green']}
                            categories={['Amount']}
                            valueFormatter={(amount: number) => `$ ${amount}`}
                        />
                    )}
                </div>
                <TabGroup>
                    <div className="flex items-center justify-between space-x-5">
                        <TabList className="flex-1">
                            <Tab>Category</Tab>
                            <Tab>Wants / Needs</Tab>
                        </TabList>
                        <ButtonToggle
                            values={[
                                {
                                    label: (
                                        <ChartPieIcon className="h-3 w-3 text-tremor-content-subtle" />
                                    ),
                                    buttonValue: 'donut'
                                },
                                {
                                    label: (
                                        <ChartBarIcon className="h-3 w-3 text-tremor-content-subtle" />
                                    ),
                                    buttonValue: 'bar'
                                }
                            ]}
                            value={chart}
                            onChanged={value => setChart(value as string)}
                        />
                    </div>
                    <TabPanels>
                        <TabPanel>
                            <ul>
                                {categories.map(({ label, amount, color }) => (
                                    <li
                                        key={label}
                                        className="cursor-pointer px-2 py-3 flex justify-between rounded-tremor-default hover:bg-tremor-background-muted"
                                        onClick={() => {
                                            if (!filters.includes(label)) {
                                                setFilters([...filters, label])
                                                toast({
                                                    title: 'Category added to transaction filter',
                                                    status: 'info',
                                                    duration: 1500,
                                                    isClosable: true
                                                })
                                            }
                                        }}
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
                                ))}
                            </ul>
                        </TabPanel>
                        <TabPanel>
                            <ul>
                                {categories.map(({ label, amount, color }) => (
                                    <li
                                        key={label}
                                        className="px-2 py-3 flex justify-between rounded-tremor-default hover:bg-tremor-background-muted"
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
                                ))}
                            </ul>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
                <div className="text-right">
                    <Button
                        variant="light"
                        size="xs"
                        icon={PencilIcon}
                        onClick={onOpenCategories}
                    >
                        Manage categories
                    </Button>
                </div>
            </div>

            <style jsx global>{`
                ${categories
                    .map(
                        (
                            { color },
                            index
                        ) => `.recharts-bar-rectangle:nth-child(${index + 1}) {
                    fill: ${color};
                }`
                    )
                    .join('\n')}

                .recharts-legend-wrapper {
                    @apply hidden;
                }
            `}</style>
        </Card>
    )
}
