import Button from '../components/Button'
import { logError } from '../services/LoggingService'
import { logoutUser } from '../services/AuthService'
import { useRouter } from 'next/router'

export default function Dashboard() {
    const router = useRouter()

    const logoutAndRedirect = async () => {
        try {
            await logoutUser()
            router.push('/login')
        } catch (error) {
            logError(error)
        }
    }

    return (
        <main>
            <Button label="Logout" onClick={logoutAndRedirect} />
        </main>
    )
}
