import { createContext, useContext, useEffect, useState } from 'react';

import _ from 'lodash';
import { reactSwal } from '@/utils/reactSwal';
import { sweetAlertOptions } from '@/utils/sweetAlertOptions';
import { useRouter } from 'next/router';

type TAuthContextData = {
    token: string;
    signin: (email: string, password: string) => Promise<void>;
    signout: () => Promise<void>;
    signup: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const AuthContext = createContext({} as TAuthContextData);

interface IGetTokenResponse {
    data: string;
    error: boolean;
}

interface ISigninResponse {
    data: string;
    error: boolean;
}

interface ISignupResponse {
    data: string | string[];
    error: boolean;
}

interface IAuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps): JSX.Element {
    const [token, setToken] = useState('');
    const router = useRouter();

    useEffect(() => {
        const getToken = async (): Promise<void> => {
            const response = await fetch('/api/getToken', { method: 'GET' })

            const json: IGetTokenResponse = await response.json();

            if (!json.error) {
                setToken(json.data)
                return
            }
        }
        getToken();
    }, [])

    const signin = async (email: string, password: string): Promise<void> => {
        reactSwal.fire({
            title: 'Por favor, aguarde...',
            allowEscapeKey: false,
            allowOutsideClick: false,
        });
        reactSwal.showLoading();
        try {
            const response = await fetch('/api/signin', { method: 'POST', body: JSON.stringify({ email, password }) })

            const json: ISigninResponse = await response.json();

            if (!json.error) {
                setToken(json.data)
                reactSwal.close()
                const { redirect } = router.query;
                if (redirect) {
                    router.push(redirect as string)
                } else {
                    router.push('/')
                }
                return
            }

            reactSwal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'E-mail e/ou senha inválidos',
                confirmButtonColor: sweetAlertOptions.confirmButtonColor,
            })
        } catch (e) {
            reactSwal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'Ocorreu algum erro',
                confirmButtonColor: sweetAlertOptions.confirmButtonColor,
            })
        }
    }

    const signout = async (): Promise<void> => {
        await fetch('/api/signout');
        setToken('')
        router.push('/auth');
    };

    const signup = async (name: string, email: string, password: string, password_confirmation: string): Promise<void> => {
        reactSwal.fire({
            title: 'Salvando dados e logando. Aguarde...',
            allowEscapeKey: false,
            allowOutsideClick: false,
        });
        reactSwal.showLoading();
        try {
            const response = await fetch(
                '/api/signup',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        password_confirmation
                    })
                }
            )

            const json: ISignupResponse = await response.json();

            if (!json.error) {
                setToken(json.data as string)
                reactSwal.close()
                const { redirect } = router.query;
                if (redirect) {
                    router.push(redirect as string)
                } else {
                    router.push('/')
                }
                return
            }

            const errors = json.data as string[];
            const listingErrorsToShow = _.map(errors, (error, index) => <li key={index}>{error}{index < errors.length - 1 ? ';' : '.'}</li>)
            reactSwal.fire({
                title: 'Oops!',
                icon: 'error',
                html: (
                    <ul className='text-red-700 italic'>
                        {listingErrorsToShow}
                    </ul>
                ),
                confirmButtonColor: sweetAlertOptions.confirmButtonColor,
            })
        } catch (e) {
            reactSwal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'Ocorreu algum erro',
                confirmButtonColor: sweetAlertOptions.confirmButtonColor,
            })
        }
    }

    return (
        <AuthContext.Provider value={{ token, signin, signout, signup }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): TAuthContextData => useContext(AuthContext)