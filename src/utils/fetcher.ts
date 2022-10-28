import env from '@/env';

interface IFetcherArgs {
    method: string;
    url: string;
    data?: object;
    auth?: string;
}

const fetcher = async<T>(args: IFetcherArgs): Promise<T> => {
    const { method, url, data, auth } = args;
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    }
    if (auth) {
        headers['Authorization'] = auth;
    }
    const response = await fetch(`${env.API}${url}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined
    });
    const json = await response.json();
    return json;
}

export default fetcher;