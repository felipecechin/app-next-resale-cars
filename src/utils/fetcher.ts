import env from '@/env';

interface IFetcherArgs {
    method: string;
    url: string;
    data?: object;
    auth?: string;
}

interface IFetcherResponse<T, V> {
    data: T | V;
    error: boolean;
}

const fetcher = async<T, V>(args: IFetcherArgs): Promise<IFetcherResponse<T, V>> => {
    const { method, url, data, auth } = args;
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    }
    if (auth) {
        headers['Authorization'] = 'Bearer ' + auth;
    }
    const response = await fetch(`${env.API}${url}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined
    });
    let error = false;
    if (!response.ok) {
        error = true;
    }
    const json = await response.json();
    return {
        data: json,
        error
    };
}

export default fetcher;