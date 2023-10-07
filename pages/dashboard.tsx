import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js'
import { Cog6ToothIcon, Squares2X2Icon } from '@heroicons/react/24/solid'

import Button from '../components/Button'
import { Checkbox } from '@chakra-ui/react'
import { Doughnut } from 'react-chartjs-2'
import { logError } from '../services/LoggingService'
import { logoutUser } from '../services/AuthService'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'

ChartJS.register(ArcElement, Tooltip)

const themeConfig = resolveConfig(tailwindConfig)

const categories = [
    {
        label: 'Food',
        percentage: 21,
        color: themeConfig.theme.colors.primary
    },
    {
        label: 'Housing',
        percentage: 19,
        color: themeConfig.theme.colors.secondary
    },
    {
        label: 'Necessities',
        percentage: 60,
        color: themeConfig.theme.colors.successlight
    }
]

const data = {
    labels: categories.map(({ label }) => label),
    datasets: [
        {
            label: '%',
            data: categories.map(({ percentage }) => percentage),
            backgroundColor: categories.map(({ color }) => color),
            borderColor: categories.map(({ color }) => color)
        }
    ]
}

export default function Dashboard() {
    const router = useRouter()
    const pathname = usePathname()

    const pages = [
        {
            url: '/dashboard',
            icon: <Squares2X2Icon className="h-5 w-5" />,
            label: 'Dashboard'
        },
        {
            url: '/settings',
            icon: <Cog6ToothIcon className="h-5 w-5" />,
            label: 'Settings'
        }
    ]

    const logoutAndRedirect = async () => {
        try {
            await logoutUser()
            router.push('/login')
        } catch (error) {
            logError(error)
        }
    }

    return (
        <main className="flex h-full bg-bglight">
            {/* <Button label="Logout" onClick={logoutAndRedirect} /> */}
            <nav className="py-7 pl-7">
                <ul className="nav-list bg-white rounded-lg p-7 space-y-3 h-full">
                    {pages.map(page => (
                        <li
                            key={page.url}
                            className={pathname === page.url && 'bg-bglight'}
                        >
                            {page.icon}
                            <span>{page.label}</span>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="flex-1 p-7 space-y-4 overflow-y-auto">
                <div className="flex space-x-4">
                    <div className="card space-y-2">
                        <div>Income this month</div>
                        <div className="amount-container">
                            <p>$7272</p>
                            <div className="tag danger">+50%</div>
                        </div>
                    </div>
                    <div className="card space-y-2">
                        <div>Expense this month</div>
                        <div className="amount-container">
                            <p>$7272</p>
                            <div className="tag success">+50%</div>
                        </div>
                    </div>
                    <div className="card space-y-2">
                        <div>Savings this month</div>
                        <div className="amount-container">
                            <p>$7272</p>
                            <div className="tag danger">+50%</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="card space-y-5">
                        <div className="font-semibold">Expense breakdown</div>
                        <div className="flex space-x-5">
                            <div className="max-h-[300px]">
                                <Doughnut data={data} />
                            </div>
                            <ul className="flex-1 px-5 divide-y divide-bglight flex flex-col justify-center">
                                {categories.map(
                                    ({ label, percentage, color }) => (
                                        <li
                                            key={label}
                                            className="py-3 flex justify-between"
                                        >
                                            <div className="flex space-x-3">
                                                <div
                                                    className="w-5 h-5 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            color as string
                                                    }}
                                                />
                                                <span>{label}</span>
                                            </div>
                                            <span>$500 ({percentage}%)</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="card space-y-5">
                        <div className="font-semibold">Monthly commitments</div>
                        <ul className="flex-1 divide-y divide-bglight flex flex-col justify-center">
                            {categories.map(({ label, percentage, color }) => (
                                <li
                                    key={label}
                                    className="py-3 flex justify-between"
                                >
                                    <div className="flex space-x-3">
                                        <Checkbox defaultChecked />
                                        <span>{label}</span>
                                    </div>
                                    <span>$500 ({percentage}%)</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                html,
                body,
                body > div:first-child,
                div#__next,
                div#__next > main {
                    height: 100%;
                }
            `}</style>

            <style jsx>{`
                .nav-list > li {
                    @apply flex items-center gap-3 cursor-pointer px-5 py-3 rounded-lg font-semibold hover:opacity-50;
                }

                .card {
                    @apply flex-1 rounded-lg p-7 bg-white;
                }

                .amount-container {
                    @apply flex items-center space-x-3;
                }

                .amount-container > p {
                    @apply text-2xl font-semibold;
                }

                .amount-container > .tag {
                    @apply rounded-lg px-2 py-1 text-xs font-semibold h-fit;
                }

                .amount-container > .tag.success {
                    @apply bg-success text-successdark;
                }

                .amount-container > .tag.danger {
                    @apply bg-danger text-dangerdark;
                }
            `}</style>
        </main>
    )
}
