import {
    AdjustmentsHorizontalIcon,
    ChartBarIcon,
    ChartPieIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    PencilIcon
} from '@heroicons/react/24/solid'
import {
    BarChart,
    BarList,
    Button,
    Card,
    Color,
    DatePicker,
    DonutChart,
    Icon,
    Metric,
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
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    SlideFade,
    useDisclosure,
    useToast
} from '@chakra-ui/react'

import Badge from '../components/Badge'
import ButtonToggle from '../components/ButtonToggle'
import MetricsCard from '../components/MetricsCard'
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
        colorName: 'green'
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

const allocation = [
    {
        label: 'Electronics',
        amount: 988,
        allocation: 900,
        colorName: 'orange'
    },
    {
        label: 'Travel',
        amount: 321,
        allocation: 300,
        colorName: 'yellow'
    },
    {
        label: 'Necessities',
        amount: 539,
        allocation: 500,
        colorName: 'green'
    },
    {
        label: 'Bills',
        amount: 789,
        allocation: 800,
        colorName: 'lime'
    },
    {
        label: 'Food',
        amount: 987,
        allocation: 1000,
        colorName: 'blue'
    },
    {
        label: 'Housing',
        amount: 3241,
        allocation: 3300,
        colorName: 'indigo'
    },
    {
        label: 'Hobby',
        amount: 321,
        allocation: 400,
        colorName: 'fuchsia'
    },
    {
        label: 'Pets',
        amount: 398,
        allocation: 400,
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
            color: 'green'
        }
    }
]

const overall = [
    { name: 'Income', value: 7279 },
    { name: 'Expenses', value: 2780 },
    { name: 'Savings', value: 1203 }
]

export default function Expenses() {
    const toast = useToast()
    const [chart, setChart] = useState('donut')
    const [categoryType, setCategoryType] = useState('wants')
    const [color, setColor] = useState('orange')
    const [filters, setFilters] = useState<string[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: isFilterOpen,
        onOpen: onFilterOpen,
        onClose: onFilterClose
    } = useDisclosure()
    const {
        isOpen: isAddOpen,
        onOpen: onAddOpen,
        onClose: onAddClose
    } = useDisclosure()
    const {
        isOpen: isOverspentOpen,
        onOpen: onOverspentOpen,
        onClose: onOverspentClose
    } = useDisclosure()
    const {
        isOpen: isUnderspentOpen,
        onOpen: onUnderspentOpen,
        onClose: onUnderspentClose
    } = useDisclosure()

    return (
        <div className="h-full">
            <TopNav />

            <div className="grid grid-cols-12 divide-x h-full">
                <div className="col-span-8 p-7 h-full space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <Card
                                className="!p-0"
                                decoration="top"
                                decorationColor="rose"
                            >
                                <div className="px-6">
                                    <div className="flex divide-x space-x-3">
                                        <div className="py-4 flex-1 flex space-x-3 items-center">
                                            <div>
                                                <Text>Overspent</Text>
                                                <Metric>$ 389</Metric>
                                            </div>
                                            <Badge color="rose">10%</Badge>
                                        </div>
                                        <div className="py-4 flex-1 text-center">
                                            <Metric>8</Metric>
                                            <Subtitle>categories</Subtitle>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center py-4 border-t">
                                    <Button
                                        variant="light"
                                        size="xs"
                                        icon={
                                            isOverspentOpen
                                                ? ChevronUpIcon
                                                : ChevronDownIcon
                                        }
                                        iconPosition="right"
                                        onClick={() =>
                                            isOverspentOpen
                                                ? onOverspentClose()
                                                : onOverspentOpen()
                                        }
                                    >
                                        View details
                                    </Button>
                                </div>
                                <SlideFade in={isOverspentOpen}>
                                    {isOverspentOpen && (
                                        <div className="px-6 pb-6">
                                            <Text>
                                                You went over your budget
                                                allocation for these categories:
                                            </Text>
                                            <Table>
                                                <TableBody>
                                                    {allocation
                                                        .filter(
                                                            ({
                                                                amount,
                                                                allocation
                                                            }) =>
                                                                amount >
                                                                allocation
                                                        )
                                                        .map(item => (
                                                            <TableRow
                                                                key={item.label}
                                                            >
                                                                <TableCell className="w-[1%]">
                                                                    <div className="space-y-2">
                                                                        <Badge
                                                                            color={
                                                                                item.colorName as Color
                                                                            }
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </Badge>
                                                                        <Subtitle>
                                                                            Allocated
                                                                            ${' '}
                                                                            {
                                                                                item.allocation
                                                                            }{' '}
                                                                            |
                                                                            Actual
                                                                            ${' '}
                                                                            {
                                                                                item.amount
                                                                            }
                                                                        </Subtitle>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="text-right">
                                                                    <Text>
                                                                        - $
                                                                        {item.amount -
                                                                            item.allocation}
                                                                    </Text>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}
                                </SlideFade>
                            </Card>
                        </div>

                        <div>
                            <Card
                                className="!p-0"
                                decoration="top"
                                decorationColor="green"
                            >
                                <div className="px-6">
                                    <div className="flex divide-x space-x-3">
                                        <div className="py-4 flex-1 flex space-x-3 items-center">
                                            <div>
                                                <Text>Underspent</Text>
                                                <Metric>$ 1000</Metric>
                                            </div>
                                            <Badge color="green">80%</Badge>
                                        </div>
                                        <div className="py-4 flex-1 text-center">
                                            <Metric>8</Metric>
                                            <Subtitle>categories</Subtitle>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center py-4 border-t">
                                    <Button
                                        variant="light"
                                        size="xs"
                                        icon={
                                            isUnderspentOpen
                                                ? ChevronUpIcon
                                                : ChevronDownIcon
                                        }
                                        iconPosition="right"
                                        onClick={() =>
                                            isUnderspentOpen
                                                ? onUnderspentClose()
                                                : onUnderspentOpen()
                                        }
                                    >
                                        View details
                                    </Button>
                                </div>
                                <SlideFade in={isUnderspentOpen}>
                                    {isUnderspentOpen && (
                                        <div className="px-6 pb-6">
                                            <Text>
                                                You underspent your allocation
                                                for these categories:
                                            </Text>
                                            <Table>
                                                <TableBody>
                                                    {allocation
                                                        .filter(
                                                            ({
                                                                amount,
                                                                allocation
                                                            }) =>
                                                                amount <=
                                                                allocation
                                                        )
                                                        .map(item => (
                                                            <TableRow
                                                                key={item.label}
                                                            >
                                                                <TableCell className="w-[1%]">
                                                                    <div className="space-y-2">
                                                                        <Badge
                                                                            color={
                                                                                item.colorName as Color
                                                                            }
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </Badge>
                                                                        <Subtitle>
                                                                            Allocated
                                                                            ${' '}
                                                                            {
                                                                                item.allocation
                                                                            }{' '}
                                                                            |
                                                                            Actual
                                                                            ${' '}
                                                                            {
                                                                                item.amount
                                                                            }
                                                                        </Subtitle>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="text-right">
                                                                    <Text>
                                                                        ${' '}
                                                                        {item.allocation -
                                                                            item.amount}
                                                                    </Text>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}
                                </SlideFade>
                            </Card>
                        </div>
                    </div>

                    <Card>
                        <Title>Expenses</Title>
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
                                        colors={['indigo', 'blue', 'green']}
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
                                                            className="cursor-pointer px-2 py-3 flex justify-between rounded-tremor-default hover:bg-tremor-background-muted"
                                                            onClick={() => {
                                                                if (
                                                                    !filters.includes(
                                                                        label
                                                                    )
                                                                ) {
                                                                    setFilters([
                                                                        ...filters,
                                                                        label
                                                                    ])
                                                                    toast({
                                                                        title: 'Category added to transaction filter',
                                                                        status: 'info',
                                                                        duration: 1500,
                                                                        isClosable:
                                                                            true
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

                <div className="col-span-4 divide-y h-full">
                    <div className="p-7 space-y-5">
                        <Title>Overall</Title>
                        <BarList
                            data={overall}
                            valueFormatter={(amount: number) => `$ ${amount}`}
                        />
                    </div>

                    <div className="space-y-3 p-7">
                        <div className="flex items-center justify-between space-x-4">
                            <Title>Transactions</Title>
                            <div className="flex items-center space-x-3">
                                {filters.length > 0 && (
                                    <Badge
                                        size="md"
                                        color="gray"
                                        className="bg-tremor-background-subtle"
                                        closable
                                        onClick={() => setFilters([])}
                                    >
                                        {filters.length} filter(s)
                                    </Badge>
                                )}
                                <Icon
                                    icon={AdjustmentsHorizontalIcon}
                                    variant="simple"
                                    tooltip="Filters"
                                    size="md"
                                    className="cursor-pointer"
                                    onClick={() =>
                                        isFilterOpen
                                            ? onFilterClose()
                                            : onFilterOpen()
                                    }
                                />
                            </div>
                        </div>
                        <SlideFade in={isFilterOpen}>
                            {isFilterOpen && (
                                <Card>
                                    <div className="space-y-3">
                                        <DatePicker />
                                        <div className="flex flex-wrap">
                                            {categories.map(
                                                ({ label, colorName }) => (
                                                    <Badge
                                                        selectable
                                                        className="mr-1 mb-1"
                                                        key={`filter-${label}`}
                                                        color={
                                                            colorName as Color
                                                        }
                                                        selected={filters.includes(
                                                            label
                                                        )}
                                                        onClick={() =>
                                                            filters.includes(
                                                                label
                                                            )
                                                                ? setFilters(
                                                                      filters.filter(
                                                                          category =>
                                                                              category !==
                                                                              label
                                                                      )
                                                                  )
                                                                : setFilters([
                                                                      ...filters,
                                                                      label
                                                                  ])
                                                        }
                                                    >
                                                        {label}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </SlideFade>
                        <Table>
                            <TableBody>
                                {transactions.map(item => (
                                    <TableRow key={item.name}>
                                        <TableCell className="w-[1%]">
                                            <div className="space-y-2">
                                                <Badge
                                                    color={
                                                        item.category
                                                            .color as Color
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
                                                        className={`p-1 rounded-full cursor-pointer ${
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
                                            <Button className="w-full">
                                                Add
                                            </Button>
                                        </div>
                                    </Card>
                                </SlideFade>
                            </div>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </div>

            <style jsx global>{`
                .tremor-BarList-bar:nth-child(1) {
                    @apply bg-green-200;
                }

                .tremor-BarList-bar:nth-child(2) {
                    @apply bg-rose-200;
                }

                .tremor-BarList-bar:nth-child(3) {
                    @apply bg-blue-200;
                }

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
