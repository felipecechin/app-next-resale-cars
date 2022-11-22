import * as yup from 'yup'

import { SubmitHandler, useForm } from 'react-hook-form'

import { FaSignInAlt } from 'react-icons/fa'
import MessageError from '@/components/shared/MessageError'
import { useAuth } from '@/contexts/AuthContext'
import { useCallback } from 'react'
import { yupMessages } from '@/utils/yupMessages'
import { yupResolver } from '@hookform/resolvers/yup'

type TFormValues = {
    email: string
    password: string
}

const loginSchema = yup.object({
    email: yup.string().email(yupMessages.email).required(yupMessages.required),
    password: yup.string().required(yupMessages.required),
})

function LoginForm(): JSX.Element {
    const { signin } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TFormValues>({
        resolver: yupResolver(loginSchema),
    })

    const submitLoginForm = useCallback<SubmitHandler<TFormValues>>(
        async ({ email, password }): Promise<void> => {
            signin(email, password)
        },
        [signin]
    )

    return (
        <form onSubmit={handleSubmit(submitLoginForm)}>
            <div className='mb-6'>
                <label className='block mb-2 font-extrabold'>E-mail</label>
                <input
                    className='inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-cyan-700 bg-white shadow border-2 border-cyan-700 rounded'
                    placeholder='Ex.: felipe@gmail.com'
                    type='email'
                    {...register('email')}
                />
                <MessageError message={errors.email?.message as string} />
            </div>
            <div className='mb-6'>
                <label className='block mb-2 font-extrabold'>Senha</label>
                <input
                    className='inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-cyan-700 bg-white shadow border-2 border-cyan-700 rounded'
                    placeholder='**********'
                    type='password'
                    {...register('password')}
                    autoComplete='password'
                />
                <MessageError message={errors.password?.message as string} />
            </div>
            <button className='flex items-center justify-center w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-cyan-800 hover:bg-cyan-900 border-3 border-indigo-900 shadow rounded transition duration-200'>
                <FaSignInAlt className='w-6 h-6 mr-2' /> Entrar
            </button>
        </form>
    )
}

export default LoginForm
