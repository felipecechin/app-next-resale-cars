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

interface IFetchResponseRegisterError {
    message: string[];
}

interface IRequestBody {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method === 'POST') {
        const body: IRequestBody = JSON.parse(req.body);

        try {
            const response = await fetcher<IFetchResponseRegisterSuccess, IFetchResponseRegisterError>({
                method: 'POST',
                url: '/auth/register',
                data: {
                    name: body.name,
                    email: body.email,
                    password: body.password,
                    password_confirmation: body.password_confirmation,
                }
            });

            console.log(response)
            if (!response.error) {
                const responseSuccess = response.data as IFetchResponseRegisterSuccess;
                storeToken(res, responseSuccess.access_token);
                return res.json({ data: 'Ok', error: false });
            }

            const responseFail = response.data as IFetchResponseRegisterError;
            return res.json({ data: responseFail.message, error: true });
        } catch (e) {
            return res.json({ data: 'Ocorreu algum erro', error: true });
        }
    }
}