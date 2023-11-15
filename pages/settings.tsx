import { Text, TextInput } from '@tremor/react'

import { useUser } from '@auth0/nextjs-auth0/client'

export default function Settings() {
    const { user, isLoading } = useUser()

    return (
        <div className="grid grid-cols-12 px-7 py-10 max-w-3xl mx-auto">
            <Text className="col-span-4 my-auto">Email</Text>
            <TextInput
                className="col-span-8"
                disabled
                value={isLoading ? '' : user.email}
            />
        </div>
    )
}
