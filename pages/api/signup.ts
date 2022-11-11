import { NextApiRequest, NextApiResponse } from 'next';

import fetcher from '@/utils/fetcher';
import { storeToken } from '@/utils/cookies';

interface IFetchResultLoginUser {
    id: number;
    name: string;
    email: string;
}

interface IFetchResponseRegisterSuccess {
    access_token: string;
    token_type: string;
    user: IFetchResultLoginUser;
}

interface IRequestBody {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

type TResponseJson = {
    data: string | string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<TResponseJson>): Promise<void> {
    if (req.method === 'POST') {
        const body: IRequestBody = JSON.parse(req.body);

        const response = await fetcher({
            method: 'POST',
            url: '/auth/register',
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
                password_confirmation: body.password_confirmation,
            }
        }) as IFetchResponseRegisterSuccess;

        storeToken(res, response.access_token);
        return res.json({ data: response.access_token });
    }
}