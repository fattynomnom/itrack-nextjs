import {
    Badge,
    BarChart,
    Button,
    Card,
    Color,
    DatePicker,
    DonutChart,
    Subtitle,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Text,
    TextInput,
    Title
} from '@tremor/react'
import {
    ChartBarIcon,
    ChartPieIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    PencilIcon
} from '@heroicons/react/24/solid'
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    SlideFade,
    useDisclosure
} from '@chakra-ui/react'

import ButtonToggle from '../components/ButtonToggle'
import TopNav from '../components/TopNav'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'
import { useState } from 'react'

const themeConfig = resolveConfig(tailwindConfig)

const categories = [
    {
        label: 'Electronics',
        amount: 988,
        color: themeConfig.theme.colors.orange[200],
        colorName: 'orange'
    },
    {
        label: 'Travel',
        amount: 321,
        color: themeConfig.theme.colors.yellow[200],
        colorName: 'yellow'
    },
    {
        label: 'Necessities',
        amount: 539,
        color: themeConfig.theme.colors.successlight,
        colorName: 'teal'
    },
    {
        label: 'Bills',
        amount: 789,
        color: themeConfig.theme.colors.lime[200],
        colorName: 'lime'
    },
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
        label: 'Hobby',
        amount: 321,
        color: themeConfig.theme.colors.fuchsia[200],
        colorName: 'fuchsia'
    },
    {
        label: 'Pets',
        amount: 398,
        color: themeConfig.theme.colors.rose[200],
        colorName: 'rose'
    }
]

const transactions = [
    {
        name: 'Water bill',
        date: '11/11/2023',
        amount: '123.10',
        category: {
            name: 'Bills',
            color: 'blue'
        }
    },
    {
        name: 'Village Park',
        date: '11/11/2023',
        amount: '56.10',
        category: {
            name: 'Food',
            color: 'indigo'
        }
    },
    {
        name: 'Movie',
        date: '11/11/2023',
        amount: '22',
        category: {
            name: 'Entertainment',
            color: 'teal'
        }
    }
]

export default function Expenses() {
    const [chart, setChart] = useState('donut')
    const [categoryType, setCategoryType] = useState('wants')
    const [color, setColor] = useState('orange')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: isAddOpen,
        onOpen: onAddOpen,
        onClose: onAddClose
    } = useDisclosure()

    return (
        <div className="h-full">
            <TopNav />

            <div className="grid grid-cols-2 divide-x h-full">
                <div className="p-7 h-full">
                    <Card>
                        <Title>Expenses by category</Title>
                        <div className="mt-5 space-y-5">
                            <div className="mx-auto">
                                {chart === 'donut' ? (
                                    <DonutChart
                                        className="h-[300px]"
                                        data={categories}
                                        category="amount"
                                        index="label"
                                        colors={
                                            categories.map(
                                                ({ colorName }) => colorName
                                            ) as Color[]
                                        }
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
                                        colors={['indigo', 'blue', 'teal']}
                                        categories={['Amount']}
                                        valueFormatter={(amount: number) =>
                                            `$ ${amount}`
                                        }
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
                                        onChanged={value =>
                                            setChart(value as string)
                                        }
                                    />
                                </div>
                                <TabPanels>
                                    <TabPanel>
                                        <div className="space-y-3">
                                            <ul>
                                                {categories.map(
                                                    ({
                                                        label,
                                                        amount,
                                                        color
                                                    }) => (
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
                                                                <Text>
                                                                    {label}
                                                                </Text>
                                                            </div>
                                                            <Text className="tabular-nums">
                                                                $ {amount} (10%)
                                                            </Text>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                            <div className="text-right">
                                                <Button
                                                    variant="light"
                                                    size="xs"
                                                    icon={PencilIcon}
                                                    onClick={onOpen}
                                                >
                                                    Manage categories
                                                </Button>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <ul>
                                            {categories.map(
                                                ({ label, amount, color }) => (
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
                                                )
                                            )}
                                        </ul>
                                    </TabPanel>
                                </TabPanels>
                            </TabGroup>
                        </div>
                    </Card>
                </div>

                <div className="p-7 space-y-3 h-full">
                    <div className="flex items-center justify-between space-x-4">
                        <Title>Transactions</Title>
                        <DatePicker className="max-w-[280px]" />
                    </div>
                    <Table>
                        <TableBody>
                            {transactions.map(item => (
                                <TableRow key={item.name}>
                                    <TableCell className="w-[1%]">
                                        <div className="space-y-2">
                                            <Badge
                                                size="xs"
                                                color={
                                                    item.category.color as Color
                                                }
                                            >
                                                {item.category.name}
                                            </Badge>
                                            <Subtitle className="text-xs">
                                                {item.date}
                                            </Subtitle>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{item.name}</Text>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Text>$ {item.amount}</Text>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>
                            <Title>Manage categories</Title>
                        </DrawerHeader>

                        <DrawerBody>
                            <div className="space-y-4">
                                <ul>
                                    {categories.map(({ label, color }) => (
                                        <li
                                            key={label}
                                            className="px-2 py-3 flex space-x-3 rounded-tremor-default hover:bg-tremor-background-muted"
                                        >
                                            <div
                                                className="w-5 h-5 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        color as string
                                                }}
                                            />
                                            <Text>{label}</Text>
                                        </li>
                                    ))}
                                </ul>
                                <div className="text-center">
                                    <Button
                                        variant="light"
                                        size="xs"
                                        icon={
                                            isAddOpen
                                                ? ChevronUpIcon
                                                : ChevronDownIcon
                                        }
                                        iconPosition="right"
                                        onClick={() =>
                                            isAddOpen
                                                ? onAddClose()
                                                : onAddOpen()
                                        }
                                    >
                                        Add category
                                    </Button>
                                </div>
                                <SlideFade in={isAddOpen}>
                                    <Card>
                                        <div className="space-y-4">
                                            <div className="flex space-x-3">
                                                <TextInput
                                                    placeholder="Category name"
                                                    className="shrink"
                                                />
                                                <ButtonToggle
                                                    values={[
                                                        {
                                                            label: 'Wants',
                                                            buttonValue: 'wants'
                                                        },
                                                        {
                                                            label: 'Needs',
                                                            buttonValue: 'needs'
                                                        }
                                                    ]}
                                                    value={categoryType}
                                                    variant="xs"
                                                    onChanged={value =>
                                                        setCategoryType(
                                                            value as string
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="flex justify-between">
                                                {Object.keys(
                                                    tailwindConfig.defaultColors
                                                ).map(colorName => (
                                                    <div
                                                        key={colorName}
                                                        className={`p-2 rounded-full cursor-pointer ${
                                                            color ===
                                                                colorName &&
                                                            'border'
                                                        }`}
                                                        style={{
                                                            borderColor:
                                                                tailwindConfig
                                                                    .defaultColors[
                                                                    colorName
                                                                ][500]
                                                        }}
                                                        onClick={() =>
                                                            setColor(colorName)
                                                        }
                                                    >
                                                        <div
                                                            className="w-5 h-5 rounded-full"
                                                            style={{
                                                                backgroundColor:
                                                                    tailwindConfig
                                                                        .defaultColors[
                                                                        colorName
                                                                    ][500]
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-right">
                                                <Button>Add</Button>
                                            </div>
                                        </div>
                                    </Card>
                                </SlideFade>
                            </div>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </div>

            <style jsx global>{`
                .recharts-bar-rectangle:nth-child(3n-2) {
                    @apply fill-primary;
                }

                .recharts-bar-rectangle:nth-child(3n-1) {
                    @apply fill-secondary;
                }

                .recharts-bar-rectangle:nth-child(3n-0) {
                    @apply fill-successlight;
                }

                .recharts-legend-wrapper {
                    @apply hidden;
                }

                .tremor-Badge-text {
                    @apply text-xs;
                }

                .tremor-TableRow-row > :first-child {
                    @apply pl-0;
                }

                .tremor-TableRow-row > :last-child {
                    @apply pr-0;
                }
            `}</style>
        </div>
    )
}
