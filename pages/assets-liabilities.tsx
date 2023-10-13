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
import { SlideFade, useDisclosure } from '@chakra-ui/react'

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

export default function AssetsLiabilities() {
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
        isOpen: isAssetsOpen,
        onOpen: onAssetsOpen,
        onClose: onAssetsClose
    } = useDisclosure()

    return (
        <div className="h-full">
            <div className="grid grid-cols-12 divide-x h-full">
                <div className="col-span-9 p-7 space-y-5">
                    <Card
                        className="!p-0"
                        decoration="left"
                        decorationColor="green"
                    >
                        <div className="p-6 pb-5 border-b">
                            <Title>Assets</Title>
                        </div>
                        <div className="grid grid-cols-2 divide-x">
                            <div className="p-6">
                                <Text>Investments current value</Text>
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
                                <SlideFade in={isAssetsOpen}>
                                    {isAssetsOpen && (
                                        <Table className="border-t mt-5 assets-table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableHeaderCell />
                                                    <TableHeaderCell>
                                                        Purchase value
                                                    </TableHeaderCell>
                                                    <TableHeaderCell>
                                                        Current value
                                                    </TableHeaderCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {investments.map(item => (
                                                    <TableRow key={item.name}>
                                                        <TableCell className="flex items-center space-x-3">
                                                            <Badge color="blue">
                                                                {item.platform}
                                                            </Badge>
                                                            <Text>
                                                                {item.name}
                                                            </Text>
                                                        </TableCell>
                                                        <TableCell>
                                                            ${' '}
                                                            {item.purchaseValue}
                                                        </TableCell>
                                                        <TableCell>
                                                            ${' '}
                                                            {item.currentValue}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    )}
                                </SlideFade>
                            </div>
                            <div className="p-6">
                                <Text>
                                    Fixed deposit interest earned at maturity
                                </Text>
                                <div className="flex items-center space-x-3 mt-1">
                                    <Metric>$ {interestValueRounded}</Metric>
                                    <BadgeDelta deltaType="moderateIncrease">
                                        {interestDiffRounded} %
                                    </BadgeDelta>
                                </div>
                                <SlideFade in={isAssetsOpen}>
                                    {isAssetsOpen && (
                                        <Table className="border-t mt-5 assets-table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableHeaderCell />
                                                    <TableHeaderCell>
                                                        Amount
                                                    </TableHeaderCell>
                                                    <TableHeaderCell>
                                                        Interest at maturity
                                                    </TableHeaderCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {fixedDeposits.map(
                                                    (item, index) => (
                                                        <TableRow
                                                            key={item.bank}
                                                        >
                                                            <TableCell className="flex items-center space-x-3">
                                                                <Badge color="blue">
                                                                    {
                                                                        item.months
                                                                    }{' '}
                                                                    months
                                                                </Badge>
                                                                <Text>
                                                                    {item.bank}
                                                                </Text>
                                                            </TableCell>
                                                            <TableCell>
                                                                $ {item.amount}
                                                            </TableCell>
                                                            <TableCell>
                                                                ${' '}
                                                                {
                                                                    interestValues[
                                                                        index
                                                                    ]
                                                                }{' '}
                                                                (
                                                                {item.interestRatePa *
                                                                    100}
                                                                % p.a.)
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    )}
                                </SlideFade>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t text-center">
                            <Button
                                variant="light"
                                size="xs"
                                icon={
                                    isAssetsOpen
                                        ? ChevronUpIcon
                                        : ChevronDownIcon
                                }
                                iconPosition="right"
                                onClick={() =>
                                    isAssetsOpen
                                        ? onAssetsClose()
                                        : onAssetsOpen()
                                }
                            >
                                {isAssetsOpen
                                    ? 'View less details'
                                    : 'View details'}
                            </Button>
                        </div>
                    </Card>

                    <Card>
                        <Title>Installments</Title>
                    </Card>
                </div>

                <div className="col-span-3 p-7">
                    <Title>Monthly payment reminders</Title>
                </div>
            </div>

            <style jsx global>{`
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
