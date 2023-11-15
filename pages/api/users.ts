import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'

import axios from 'axios'

const users = async (req, res) => {
    const { accessToken } = await getAccessToken(req, res)
    const response = await axios.post(
        'http://localhost:4000/graphql',
        {
            query: `
                query Query {
                    getAllUsers {
                        email
                    }
                }
            `
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )
    res.status(200).json(response.data)
}

export default withApiAuthRequired(users)
