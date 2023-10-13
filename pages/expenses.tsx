import { BarList, Color, Title } from '@tremor/react'
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure
} from '@chakra-ui/react'

import CategorySettings from '../components/CategorySettings'
import ExpensesDetailsCard from '../components/ExpensesDetailsCard'
import SpendingDetailsCard from '../components/SpendingDetailsCard'
import TopNav from '../components/TopNav'
import TransactionsList from '../components/TransactionsList'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'
import { useState } from 'react'

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

const allocation = [
    {
        label: 'Electronics',
        amount: 988,
        allocation: 900,
        colorName: 'orange' as Color
    },
    {
        label: 'Travel',
        amount: 321,
        allocation: 300,
        colorName: 'yellow' as Color
    },
    {
        label: 'Necessities',
        amount: 539,
        allocation: 500,
        colorName: 'green' as Color
    },
    {
        label: 'Bills',
        amount: 789,
        allocation: 800,
        colorName: 'lime' as Color
    },
    {
        label: 'Food',
        amount: 987,
        allocation: 1000,
        colorName: 'blue' as Color
    },
    {
        label: 'Housing',
        amount: 3241,
        allocation: 3300,
        colorName: 'indigo' as Color
    },
    {
        label: 'Hobby',
        amount: 321,
        allocation: 400,
        colorName: 'fuchsia' as Color
    },
    {
        label: 'Pets',
        amount: 398,
        allocation: 400,
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

const overall = [
    { name: 'Income', value: 7279 },
    { name: 'Expenses', value: 2780 },
    { name: 'Savings', value: 1203 }
]

export default function Expenses() {
    const [filters, setFilters] = useState<string[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className="h-full">
            <TopNav />

            <div className="grid grid-cols-12 divide-x h-full">
                <div className="col-span-8 p-7 h-full space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <SpendingDetailsCard
                                type="overspent"
                                spending={allocation}
                            />
                        </div>

                        <div>
                            <SpendingDetailsCard
                                type="underspent"
                                spending={allocation}
                            />
                        </div>
                    </div>

                    <ExpensesDetailsCard
                        filters={filters}
                        categories={categories}
                        setFilters={setFilters}
                        onOpenCategories={onOpen}
                    />
                </div>

                <div className="col-span-4 divide-y h-full">
                    <div className="p-7 space-y-5">
                        <Title>Overall</Title>
                        <BarList
                            data={overall}
                            valueFormatter={(amount: number) => `$ ${amount}`}
                        />
                    </div>

                    <TransactionsList
                        transactions={transactions}
                        hasFilters
                        filters={filters}
                        categories={categories}
                        setFilters={setFilters}
                    />
                </div>

                <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>
                            <Title>Manage categories</Title>
                        </DrawerHeader>

                        <DrawerBody>
                            <CategorySettings categories={categories} />
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
            `}</style>
        </div>
    )
}
