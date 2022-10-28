import { NextApiRequest, NextApiResponse } from 'next';

import fetcher from '@/utils/fetcher';
import { storeToken } from '@/utils/cookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method === 'POST') {
        const body = JSON.parse(req.body);

        try {
            const result = await fetcher({
                method: 'POST',
                url: '/auth/signin',
                data: {
                    email: body.email,
                    password: body.password,
                }
            });

            if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
                return res.json({ data: 'Ocorreu algum erro', error: true });
            }

            storeToken(res, 'token')
            return res.json({ data: 'Ok', error: false });
        } catch (e) {
            return res.json({ data: 'Ocorreu algum erro desconhecido', error: true });
        }
    }
}