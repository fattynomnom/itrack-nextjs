import {
    BanknotesIcon,
    Cog6ToothIcon,
    Squares2X2Icon
} from '@heroicons/react/24/solid'

import { usePathname } from 'next/navigation'

const pages = [
    {
        url: '/dashboard',
        icon: <Squares2X2Icon className="h-5 w-5" />,
        label: 'Dashboard'
    },
    {
        url: '/expenses',
        icon: <BanknotesIcon className="h-5 w-5" />,
        label: 'Expenses'
    },
    {
        url: '/settings',
        icon: <Cog6ToothIcon className="h-5 w-5" />,
        label: 'Settings'
    }
]

export default function SideNav() {
    const pathname = usePathname()

    return (
        <nav>
            <ul className="nav-list bg-bglight p-10 space-y-3 h-full min-w-[300px] border-r border-bordercolor">
                {pages.map(page => (
                    <li
                        key={page.url}
                        className={pathname === page.url && 'bg-bgcolor'}
                    >
                        {page.icon}
                        <span>{page.label}</span>
                    </li>
                ))}
            </ul>

            <style jsx>{`
                .nav-list > li {
                    @apply flex items-center gap-3 cursor-pointer px-5 py-3 rounded-lg font-semibold hover:opacity-50;
                }
            `}</style>
        </nav>
    )
}
