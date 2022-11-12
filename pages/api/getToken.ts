import { NextApiRequest, NextApiResponse } from 'next';

import { getToken } from '@/utils/cookies';

type TResponseJson = {
    data: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<TResponseJson>): Promise<void> {
    const token = getToken(req);
    if (token) {
        return res.json({ data: token });
    }
    return res.status(500).json({ data: 'No token' });
}