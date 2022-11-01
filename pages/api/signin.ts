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

interface IFetchResponseLoginError {
    message: string;
}

interface IRequestBody {
    email: string;
    password: string;
}

type TResponseJson = {
    data: string;
    error: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<TResponseJson>): Promise<void> {
    if (req.method === 'POST') {
        const body: IRequestBody = JSON.parse(req.body);

        try {
            const response = await fetcher<IFetchResponseLoginSuccess, IFetchResponseLoginError>({
                method: 'POST',
                url: '/auth/login',
                data: {
                    email: body.email,
                    password: body.password,
                }
            });

            console.log(response)
            if (!response.error) {
                const responseSuccess = response.data as IFetchResponseLoginSuccess;
                storeToken(res, responseSuccess.access_token);
                return res.json({ data: 'Ok', error: false });
            }

            const responseFail = response.data as IFetchResponseLoginError;
            return res.json({ data: responseFail.message, error: true });
        } catch (e) {
            return res.json({ data: 'Ocorreu algum erro', error: true });
        }
    }
}