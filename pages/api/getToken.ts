import { NextApiRequest, NextApiResponse } from 'next';

import { getToken } from '@/utils/cookies';

type TResponseJson = {
    data: string;
    error: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<TResponseJson>): Promise<void> {
    try {
        const token = getToken(req);
        if (token) {
            return res.json({ data: token, error: false });
        } else {
            return res.json({ data: 'Token não encontrado', error: true });
        }
    } catch (e) {
        return res.json({ data: 'Ocorreu algum erro', error: true });
    }
}