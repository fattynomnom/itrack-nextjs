import {
    Button,
    Card,
    Color,
    Metric,
    Subtitle,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Text
} from '@tremor/react'
import {
    ChevronDownIcon,
    ChevronUpIcon,
    PencilIcon
} from '@heroicons/react/24/solid'
import { SlideFade, useDisclosure } from '@chakra-ui/react'

import Badge from './Badge'

export default function SpendingDetailsCard({
    type,
    spending,
    onOpenCategories
}: {
    type: 'overspent' | 'underspent'
    spending: {
        label: string
        amount: number
        allocation: number
        colorName: Color
    }[]
    onOpenCategories: () => void
}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const color = type === 'overspent' ? 'rose' : 'green'

    return (
        <Card className="!p-0" decoration="top" decorationColor={color}>
            <div className="px-6">
                <div className="flex divide-x space-x-3">
                    <div className="py-4 flex-1 flex space-x-3 items-center">
                        <div>
                            <Text>
                                {type === 'overspent'
                                    ? 'Overspent'
                                    : 'Underspent'}
                            </Text>
                            <Metric>$ 389</Metric>
                        </div>
                        <Badge color={color}>10%</Badge>
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
                    icon={isOpen ? ChevronUpIcon : ChevronDownIcon}
                    iconPosition="right"
                    onClick={() => (isOpen ? onClose() : onOpen())}
                >
                    View details
                </Button>
            </div>
            <SlideFade in={isOpen}>
                {isOpen && (
                    <div>
                        <div className="px-6">
                            <Text>
                                {type === 'overspent'
                                    ? 'You went over your budget allocation for these categories:'
                                    : 'You underspent your allocation for these categories:'}
                            </Text>
                            <Table>
                                <TableBody>
                                    {spending
                                        .filter(({ amount, allocation }) =>
                                            type === 'overspent'
                                                ? amount > allocation
                                                : amount <= allocation
                                        )
                                        .map(item => (
                                            <TableRow key={item.label}>
                                                <TableCell className="w-[1%]">
                                                    <div className="space-y-2">
                                                        <Badge
                                                            color={
                                                                item.colorName
                                                            }
                                                        >
                                                            {item.label}
                                                        </Badge>
                                                        <Subtitle>
                                                            Allocated ${' '}
                                                            {item.allocation} |
                                                            Actual ${' '}
                                                            {item.amount}
                                                        </Subtitle>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Text>
                                                        {type === 'overspent'
                                                            ? `- $ ${
                                                                  item.amount -
                                                                  item.allocation
                                                              }`
                                                            : `$ ${
                                                                  item.allocation -
                                                                  item.amount
                                                              }`}
                                                    </Text>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="px-6 py-4 text-center border-t">
                            <Button
                                variant="light"
                                size="xs"
                                icon={PencilIcon}
                                onClick={onOpenCategories}
                            >
                                Manage allocation
                            </Button>
                        </div>
                    </div>
                )}
            </SlideFade>
        </Card>
    )
}
