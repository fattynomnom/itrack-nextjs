import { useRouter } from 'next/router'
import Button from '../components/Button'
import { logoutUser } from '../services/FirebaseAuthService'
import { logError } from '../services/LoggingService'

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
