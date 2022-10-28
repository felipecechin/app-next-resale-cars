import { NextApiRequest, NextApiResponse } from 'next';
import { parse, serialize } from 'cookie';

const cookieName = '_resalecars';

export const getToken = (req: NextApiRequest): string | undefined => {
    const cookies = parseCookies(req)
    return cookies[cookieName]
}

export const parseCookies = (req: NextApiRequest): Partial<{
    [key: string]: string;
}> => {
    // For API Routes we don't need to parse the cookies.
    if (req.cookies) return req.cookies;

    // For pages we do need to parse the cookies.
    const cookie = req.headers?.cookie;

    return parse(cookie || '');
}

export const removeToken = (res: NextApiResponse): void => {
    const cookie = serialize(cookieName, '', {
        maxAge: -1,
        path: '/',
    })

    res.setHeader('Set-Cookie', cookie)
}

export const storeToken = (res: NextApiResponse, token: string, client = false): string | NextApiResponse => {
    const cookie = serialize(cookieName, token, {
        expires: new Date(Date.now() + (60 * 60 * 4) * 1000),
        httpOnly: true,
        maxAge: 60 * 60 * 4,
        path: '/',
        sameSite: 'lax',
        // secure: true
    })

    if (client === true) return cookie;

    return res.setHeader('Set-Cookie', cookie);
}

const functionsToExport = {
    getToken,
    removeToken,
    storeToken
}

export default functionsToExport;