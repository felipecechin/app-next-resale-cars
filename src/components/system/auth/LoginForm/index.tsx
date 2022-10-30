import * as yup from 'yup';

import { FaSignInAlt } from 'react-icons/fa';
import { reactSwal } from '@/utils/reactSwal';
import { sweetAlertOptions } from '@/utils/sweetAlertOptions';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';

interface SigninResponse {
    data: string;
    error: boolean;
}

const loginSchema = yup.object({
    email: yup.string().email().required().label('E-mail'),
    password: yup.string().required().label('Senha')
})

function LoginForm(): JSX.Element {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const submitFormLogin = async (): Promise<void> => {
        reactSwal.fire({
            title: 'Por favor, aguarde...',
            allowEscapeKey: false,
            allowOutsideClick: false,
        });
        reactSwal.showLoading();
        try {
            const response = await fetch('/api/signin', { method: 'POST', body: JSON.stringify({ email: 'ficechin@hotmail.com', password: 'faehuf@10' }) })

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
    }

    return (
        <form onSubmit={handleSubmit(submitFormLogin)}>
            <div className="mb-6">
                <label className="block mb-2 font-extrabold">E-mail</label>
                <input
                    className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-cyan-700 bg-white shadow border-2 border-cyan-700 rounded"
                    placeholder="Ex.: felipe@gmail.com"
                    type="email"
                    {...register('email')}
                />
            </div>
            <div className="mb-6">
                <label className="block mb-2 font-extrabold">Senha</label>
                <input
                    className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-cyan-700 bg-white shadow border-2 border-cyan-700 rounded"
                    placeholder="**********"
                    type="password"
                    {...register('password')}
                />
            </div>
            <button className="flex items-center justify-center w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-cyan-800 hover:bg-cyan-900 border-3 border-indigo-900 shadow rounded transition duration-200">
                <FaSignInAlt className='w-6 h-6 mr-2' /> Entrar
            </button>
            <p className="text-center font-extrabold">Sem conta? <a className="link text-cyan-700 link-hover" href="#">Registre-se</a></p>
        </form>
    )
}

export default LoginForm;