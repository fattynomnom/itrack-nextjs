import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import app from '../plugins/firebase'
import { User } from '../types/User'

const auth = getAuth(app)

export const createUser = async (
    email: string,
    password: string
): Promise<User> => {
    const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    )

    return {
        uid: credential.user.uid,
        name: credential.user.displayName,
        email: credential.user.email
    }
}