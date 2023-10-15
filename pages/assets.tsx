import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    SlideFade,
    useDisclosure
} from '@chakra-ui/react'
import {
    BadgeDelta,
    Button,
    Card,
    Metric,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text,
    Title
} from '@tremor/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

import Badge from '../components/Badge'

const investments = [
    {
        name: 'DOT',
        platform: 'Luno',
        purchaseValue: 7000,
        currentValue: 7010
    },
    {
        name: 'Gold',
        platform: 'Versa',
        purchaseValue: 5000,
        currentValue: 4997.3
    }
]

const realizedInvestments = [
    {
        name: 'Bitcoin',
        platform: 'Luno',
        purchaseValue: 10000,
        endValue: 9780
    },
    {
        name: 'REITs',
        platform: 'Versa',
        purchaseValue: 9000,
        endValue: 8700
    }
]

const fixedDeposits = [
    {
        bank: 'Maybank',
        interestRatePa: 0.04,
        months: 12,
        amount: 10000
    },
    {
        bank: 'CIMB',
        interestRatePa: 0.0345,
        months: 24,
        amount: 15000
    }
]

// todo

// manage investments
// update investments values
// add new investments
// realized investments

// manage fixed deposits
// add new fd
// matured fds

export default function Assets() {
    // #region investments
    const totalCurrentValue = investments.reduce(
        (acc, { currentValue }) => (acc += currentValue),
        0
    )
    const totalPurchaseValue = investments.reduce(
        (acc, { purchaseValue }) => (acc += purchaseValue),
        0
    )
    const isInvestmentPositive = totalCurrentValue > totalPurchaseValue
    const isInvestmentUnchanged = totalCurrentValue === totalPurchaseValue
    const investmentsDiff = isInvestmentUnchanged
        ? 0
        : isInvestmentPositive
        ? ((totalCurrentValue - totalPurchaseValue) / totalPurchaseValue) * 100
        : ((totalPurchaseValue - totalCurrentValue) / totalPurchaseValue) * 100
    const investmentsDiffRounded =
        Math.round((investmentsDiff + Number.EPSILON) * 100) / 100
    const diffPerInvestment = investments.map(item => {
        if (item.currentValue === item.purchaseValue) return 0
        const isPositive = item.currentValue > item.purchaseValue
        const diff = isPositive
            ? item.currentValue - item.purchaseValue
            : item.purchaseValue - item.currentValue
        const diffPercentage = (diff / item.purchaseValue) * 100
        const rounded =
            Math.round((diffPercentage + Number.EPSILON) * 100) / 100
        return isPositive ? rounded : Number(`-${rounded}`)
    })
    // #endregion

    // #region fixed deposits
    const interestValues = fixedDeposits.map(item => {
        const value = ((item.amount * item.interestRatePa) / 12) * item.months
        return Math.round((value + Number.EPSILON) * 100) / 100
    })
    const interestValue = interestValues.reduce((acc, item) => (acc += item), 0)
    const fdValue = fixedDeposits.reduce(
        (acc, { amount }) => (acc += amount),
        0
    )
    const interestDiff = (interestValue / fdValue) * 100
    const interestValueRounded =
        Math.round((interestValue + Number.EPSILON) * 100) / 100
    const interestDiffRounded =
        Math.round((interestDiff + Number.EPSILON) * 100) / 100
    // #endregion

    const {
        isOpen: isInvesmentsOpen,
        onOpen: onInvestmentsOpen,
        onClose: onInvestmentsClose
    } = useDisclosure()
    const {
        isOpen: isAssetsOpen,
        onOpen: onAssetsOpen,
        onClose: onAssetsClose
    } = useDisclosure()

    return (
        <div className="h-full">
            <Accordion allowMultiple index={[0]}>
                <AccordionItem>
                    <AccordionButton>
                        <Title>Investments</Title>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                        <div className="grid grid-cols-2 gap-5 p-7">
                            <div>
                                <Card
                                    decoration="top"
                                    decorationColor="green"
                                    className="!p-0 divide-y"
                                >
                                    <div className="p-6">
                                        <Text>Investments current value</Text>
                                        <div className="flex items-center space-x-3 mt-1">
                                            <Metric>
                                                $ {totalCurrentValue}
                                            </Metric>
                                            <BadgeDelta
                                                deltaType={
                                                    isInvestmentUnchanged
                                                        ? 'unchanged'
                                                        : isInvestmentPositive
                                                        ? 'moderateIncrease'
                                                        : 'moderateDecrease'
                                                }
                                            >
                                                {investmentsDiffRounded} %
                                            </BadgeDelta>
                                        </div>
                                    </div>
                                    <SlideFade in={isInvesmentsOpen}>
                                        {isInvesmentsOpen && (
                                            <Table className="assets-table p-6">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableHeaderCell />
                                                        <TableHeaderCell className="w-[1%]">
                                                            Purchase value
                                                        </TableHeaderCell>
                                                        <TableHeaderCell className="w-[1%]">
                                                            Current value
                                                        </TableHeaderCell>
                                                        <TableHeaderCell className="w-[1%]" />
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {investments.map(
                                                        (item, index) => (
                                                            <TableRow
                                                                key={item.name}
                                                            >
                                                                <TableCell className="flex items-center space-x-3">
                                                                    <Badge color="blue">
                                                                        {
                                                                            item.platform
                                                                        }
                                                                    </Badge>
                                                                    <Text>
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </Text>
                                                                </TableCell>
                                                                <TableCell>
                                                                    ${' '}
                                                                    {
                                                                        item.purchaseValue
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    ${' '}
                                                                    {
                                                                        item.currentValue
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    <BadgeDelta
                                                                        size="xs"
                                                                        deltaType={
                                                                            diffPerInvestment[
                                                                                index
                                                                            ] >
                                                                            0
                                                                                ? 'moderateIncrease'
                                                                                : 'moderateDecrease'
                                                                        }
                                                                    >
                                                                        {diffPerInvestment[
                                                                            index
                                                                        ]
                                                                            .toString()
                                                                            .replace(
                                                                                '-',
                                                                                ''
                                                                            )}
                                                                    </BadgeDelta>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        )}
                                    </SlideFade>
                                    <div className="px-6 py-4 text-center">
                                        <Button
                                            variant="light"
                                            size="xs"
                                            icon={
                                                isInvesmentsOpen
                                                    ? ChevronUpIcon
                                                    : ChevronDownIcon
                                            }
                                            iconPosition="right"
                                            onClick={() =>
                                                isInvesmentsOpen
                                                    ? onInvestmentsClose()
                                                    : onInvestmentsOpen()
                                            }
                                        >
                                            {isInvesmentsOpen
                                                ? 'View less details'
                                                : 'View details'}
                                        </Button>
                                    </div>
                                </Card>
                            </div>

                            <div>
                                <Card decoration="top" decorationColor="green">
                                    <Text>Realized profit / loss</Text>
                                    <div className="flex items-center space-x-3 mt-1">
                                        <Metric>$ {totalCurrentValue}</Metric>
                                        <BadgeDelta
                                            deltaType={
                                                isInvestmentUnchanged
                                                    ? 'unchanged'
                                                    : isInvestmentPositive
                                                    ? 'moderateIncrease'
                                                    : 'moderateDecrease'
                                            }
                                        >
                                            {investmentsDiffRounded} %
                                        </BadgeDelta>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

            <style jsx global>{`
                .chakra-accordion__button {
                    @apply border-b !important;
                }

                .assets-table > table > tbody {
                    @apply divide-none;
                }

                .assets-table > table > tbody > tr > td {
                    @apply pb-0;
                }
            `}</style>
        </div>
    )
}
