import { NextApiRequest, NextApiResponse } from 'next'

import FetchError from '@/utils/FetchError'
import fetcher from '@/utils/fetcher'
import { storeToken } from '@/utils/cookies'

interface IFetchResponseLoginSuccess {
    access_token: string
}

interface IRequestBody {
    email: string
    password: string
}

interface INextApiRequestWithBody extends NextApiRequest {
    body: IRequestBody
}

export default async function handler(req: INextApiRequestWithBody, res: NextApiResponse): Promise<void> {
    if (req.method === 'POST') {
        try {
            const response = (await fetcher({
                method: 'POST',
                url: '/users/login',
                data: {
                    email: req.body.email,
                    password: req.body.password,
                },
            })) as IFetchResponseLoginSuccess

            storeToken(res, response.access_token)
            return res.json({ data: response.access_token })
        } catch (e) {
            if (e instanceof FetchError) {
                return res.status(e.status).json(e.data)
            }
            return res.status(500).json({
                message: 'Unkown error',
            })
        }
    }
}
