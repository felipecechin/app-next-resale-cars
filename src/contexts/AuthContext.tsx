import { closeSwal, showSwalError, showSwalLoading } from '@/utils/reactSwal'
import { createContext, useContext, useEffect, useState } from 'react'

import fetcher from '@/utils/fetcher'
import { useRouter } from 'next/router'

type TAuthContextData = {
    token: string
    signin: (email: string, password: string) => Promise<void>
    signout: () => Promise<void>
    signup: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const AuthContext = createContext({} as TAuthContextData)

interface IGetTokenResponse {
    data: string
}

interface ISigninResponse {
    data: string
}

interface ISignupResponse {
    data: string
}

interface IAuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider({ children }: IAuthProviderProps): JSX.Element {
    const [token, setToken] = useState('')
    const router = useRouter()

    useEffect(() => {
        const getToken = async (): Promise<void> => {
            try {
                const response = (await fetcher({
                    method: 'GET',
                    url: '/api/getToken',
                    nextApi: true,
                })) as IGetTokenResponse

                setToken(response.data)
            } catch (error) {
                setToken('')
            }
        }
        getToken()
    }, [])

    const signin = async (email: string, password: string): Promise<void> => {
        showSwalLoading()
        try {
            const response = (await fetcher({
                url: '/api/signin',
                method: 'POST',
                data: { email, password },
                nextApi: true,
            })) as ISigninResponse

            setToken(response.data)
            closeSwal()
            const { redirect } = router.query
            if (redirect) {
                router.push(redirect as string)
            } else {
                router.push('/')
            }
        } catch (e) {
            showSwalError('E-mail e/ou senha inválidos')
        }
    }

    const signout = async (): Promise<void> => {
        await fetcher({
            url: '/api/signout',
            method: 'GET',
            nextApi: true,
        })
        setToken('')
        router.push('/auth')
    }

    const signup = async (name: string, email: string, password: string, confirmPassword: string): Promise<void> => {
        showSwalLoading('Salvando dados e logando. Aguarde...')
        try {
            const response = (await fetcher({
                url: '/api/signup',
                method: 'POST',
                data: {
                    name,
                    email,
                    password,
                    confirmPassword,
                },
                nextApi: true,
            })) as ISignupResponse

            setToken(response.data)
            closeSwal()
            const { redirect } = router.query
            if (redirect) {
                router.push(redirect as string)
            } else {
                router.push('/')
            }
        } catch (e) {
            showSwalError('Ocorreu algum erro')
        }
    }

    return <AuthContext.Provider value={{ token, signin, signout, signup }}>{children}</AuthContext.Provider>
}

export const useAuth = (): TAuthContextData => useContext(AuthContext)
