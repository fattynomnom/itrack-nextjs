import {
    Card,
    Color,
    DatePicker,
    Icon,
    Subtitle,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Text,
    Title
} from '@tremor/react'
import { SlideFade, useDisclosure } from '@chakra-ui/react'

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import Badge from './Badge'

export default function TransactionsList({
    transactions,
    hasFilters = false,
    filters = [],
    categories = [],
    setFilters
}: {
    transactions: {
        name: string
        date: string
        amount: number
        category: {
            name: string
            color: Color
        }
    }[]
    hasFilters?: boolean
    filters?: string[]
    categories?: {
        label: string
        amount: number
        color: string
        colorName: Color
    }[]
    setFilters?: (value: string[]) => void
}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className="space-y-3 p-7">
            <div className="flex items-center justify-between space-x-4">
                <Title>Transactions</Title>
                {hasFilters && (
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
                            onClick={() => (isOpen ? onClose() : onOpen())}
                        />
                    </div>
                )}
            </div>
            {hasFilters && (
                <SlideFade in={isOpen}>
                    {isOpen && (
                        <Card>
                            <div className="space-y-3">
                                <DatePicker />
                                <div className="flex flex-wrap">
                                    {categories.map(({ label, colorName }) => (
                                        <Badge
                                            selectable
                                            className="mr-1 mb-1"
                                            key={`filter-${label}`}
                                            color={colorName as Color}
                                            selected={filters.includes(label)}
                                            onClick={() =>
                                                filters.includes(label)
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
                                    ))}
                                </div>
                            </div>
                        </Card>
                    )}
                </SlideFade>
            )}
            <Table>
                <TableBody>
                    {transactions.map(item => (
                        <TableRow key={item.name}>
                            <TableCell className="w-[1%]">
                                <div className="space-y-2">
                                    <Badge color={item.category.color as Color}>
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
    )
}
