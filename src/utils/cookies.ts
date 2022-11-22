import { IncomingMessage } from 'http'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import { NextApiResponse } from 'next'
import { serialize } from 'cookie'

const cookieName = '_resalecars'

export const getToken = (
    req: IncomingMessage & {
        cookies: NextApiRequestCookies
    }
): string | undefined => {
    const cookies = parseCookies(req)
    return cookies[cookieName]
}

export const parseCookies = (
    req: IncomingMessage & {
        cookies: NextApiRequestCookies
    }
): Partial<{
    [key: string]: string
}> => {
    return req.cookies
}

export const removeToken = (res: NextApiResponse): void => {
    const cookie = serialize(cookieName, '', {
        maxAge: -1,
        path: '/',
    })

    res.setHeader('Set-Cookie', cookie)
}

export const storeToken = (res: NextApiResponse, token: string): void => {
    const cookie = serialize(cookieName, token, {
        expires: new Date(Date.now() + 60 * 60 * 4 * 1000),
        httpOnly: true,
        maxAge: 60 * 60 * 4,
        path: '/',
        sameSite: 'lax',
        // secure: true
    })

    res.setHeader('Set-Cookie', cookie)
}
