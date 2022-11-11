import { NextApiRequest, NextApiResponse } from 'next';

import { removeToken } from '@/utils/cookies';

type TResponseJson = {
    data: string;
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<TResponseJson>): Promise<void> {
    removeToken(res);
    return res.json({ data: 'Ok' });
}