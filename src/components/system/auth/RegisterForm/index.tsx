import * as yup from 'yup';

import { SubmitHandler, useForm } from 'react-hook-form';

import { FaSignInAlt } from 'react-icons/fa';
import MessageError from '@/components/shared/MessageError';
import { reactSwal } from '@/utils/reactSwal';
import { sweetAlertOptions } from '@/utils/sweetAlertOptions';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';

const registerSchema = yup.object({
    name: yup.string().required('Por favor, preencha o campo'),
    email: yup.string().email('Informe um e-mail válido').required('Por favor, preencha o campo'),
    password: yup.string().required('Por favor, preencha o campo'),
    password_confirmation: yup.string().required('Por favor, preencha o campo').oneOf([yup.ref('password')], 'As senhas devem ser iguais')
})

type FormValues = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

interface SigninResponse {
    data: string;
    error: boolean;
}

function RegisterForm(): JSX.Element {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(registerSchema)
    });

    const submitFormRegister = useCallback<SubmitHandler<FormValues>>(async ({ name, email, password, password_confirmation }): Promise<void> => {
        console.log(email, password);
        return
        // reactSwal.fire({
        //     title: 'Por favor, aguarde...',
        //     allowEscapeKey: false,
        //     allowOutsideClick: false,
        // });
        // reactSwal.showLoading();
        try {
            const response = await fetch('/api/signin', { method: 'POST', body: JSON.stringify({ email, password }) })

            const json: SigninResponse = await response.json();

            if (!json.error) {
                reactSwal.close()
                router.push('/')
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
    }, [router]);

    return (
        <form onSubmit={handleSubmit(submitFormRegister)}>
            <div className="mb-6">
                <label className="block mb-2 font-extrabold">Nome</label>
                <input
                    className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-cyan-700 bg-white shadow border-2 border-cyan-700 rounded"
                    placeholder="Ex.: Felipe"
                    type="text"
                    {...register('name')}
                />
                <MessageError
                    message={errors.name?.message as string}
                />
            </div>
            <div className="mb-6">
                <label className="block mb-2 font-extrabold">E-mail</label>
                <input
                    className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-cyan-700 bg-white shadow border-2 border-cyan-700 rounded"
                    placeholder="Ex.: felipe@gmail.com"
                    type="email"
                    {...register('email')}
                />
                <MessageError
                    message={errors.email?.message as string}
                />
            </div>
            <div className="mb-6">
                <label className="block mb-2 font-extrabold">Senha</label>
                <input
                    className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-cyan-700 bg-white shadow border-2 border-cyan-700 rounded"
                    placeholder="**********"
                    type="password"
                    {...register('password')}
                    autoComplete="password"
                />
                <MessageError
                    message={errors.password?.message as string}
                />
            </div>
            <div className="mb-6">
                <label className="block mb-2 font-extrabold">Confirmação de senha</label>
                <input
                    className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-cyan-700 bg-white shadow border-2 border-cyan-700 rounded"
                    placeholder="**********"
                    type="password"
                    {...register('password_confirmation')}
                    autoComplete="password"
                />
                <MessageError
                    message={errors.password_confirmation?.message as string}
                />
            </div>
            <button className="flex items-center justify-center w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-cyan-800 hover:bg-cyan-900 border-3 border-indigo-900 shadow rounded transition duration-200">
                <FaSignInAlt className='w-6 h-6 mr-2' /> Registrar-me
            </button>
        </form>
    )
}

export default RegisterForm;