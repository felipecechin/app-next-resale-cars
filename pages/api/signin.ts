import { NextApiRequest, NextApiResponse } from 'next';

import fetcher from '@/utils/fetcher';
import { storeToken } from '@/utils/cookies';

interface IFetchResultLoginUser {
    id: number;
    name: string;
    email: string;
}

interface IFetchResponseLoginSuccess {
    access_token: string;
    token_type: string;
    user: IFetchResultLoginUser;
}

interface IRequestBody {
    email: string;
    password: string;
}

type TResponseJson = {
    data: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<TResponseJson>): Promise<void> {
    if (req.method === 'POST') {
        const body: IRequestBody = JSON.parse(req.body);

        const response = await fetcher({
            method: 'POST',
            url: '/auth/login',
            data: {
                email: body.email,
                password: body.password,
            }
        }) as IFetchResponseLoginSuccess

        storeToken(res, response.access_token);
        return res.json({ data: response.access_token });
    }
}