import {
    ArrowLeftOnRectangleIcon,
    BanknotesIcon,
    BookOpenIcon,
    Cog6ToothIcon,
    Squares2X2Icon
} from '@heroicons/react/24/solid'

import { Title } from '@tremor/react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'

const pages = [
    {
        url: '/dashboard',
        icon: (
            <Squares2X2Icon className="h-5 w-5 text-tremor-content-emphasis" />
        ),
        label: 'Dashboard'
    },
    {
        url: '/budget',
        icon: (
            <BanknotesIcon className="h-5 w-5 text-tremor-content-emphasis" />
        ),
        label: 'Budget'
    },
    {
        url: '/assets-liabilities',
        icon: <BookOpenIcon className="h-5 w-5 text-tremor-content-emphasis" />,
        label: 'Assets / Liabilities'
    },
    {
        url: '/assets',
        icon: <BookOpenIcon className="h-5 w-5 text-tremor-content-emphasis" />,
        label: 'Assets'
    },
    {
        url: '/settings',
        icon: (
            <Cog6ToothIcon className="h-5 w-5 text-tremor-content-emphasis" />
        ),
        label: 'Settings'
    }
]

export default function SideNav({ className }: { className?: string }) {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <nav className={className}>
            <ul className="bg-tremor-background-subtle p-10 space-y-3 h-full min-w-[300px] border-r">
                {pages.map(page => (
                    <li
                        key={page.url}
                        className={`nav-item ${
                            pathname === page.url ? 'bg-bgcolor' : ''
                        }`}
                        onClick={() => router.push(page.url)}
                    >
                        {page.icon}
                        <Title>{page.label}</Title>
                    </li>
                ))}
                <li>
                    <a href="/api/auth/logout" className="nav-item">
                        <ArrowLeftOnRectangleIcon className="h-5 w-5 text-tremor-content-emphasis" />
                        <Title>Logout</Title>
                    </a>
                </li>
            </ul>

            <style jsx>{`
                .nav-item {
                    @apply flex items-center gap-3 cursor-pointer px-5 py-3 rounded-lg hover:opacity-50;
                }
            `}</style>
        </nav>
    )
}
