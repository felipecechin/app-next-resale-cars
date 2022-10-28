import { NextApiRequest, NextApiResponse } from 'next';

import { removeToken } from '@/utils/cookies';

export default async function handler(_req: NextApiRequest, res: NextApiResponse): Promise<void> {
    removeToken(res);
    return res.json({ data: 'Ok', error: false });
}