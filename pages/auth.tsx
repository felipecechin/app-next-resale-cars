import { FaSignInAlt } from 'react-icons/fa';
import { reactSwal } from '@/utils/reactSwal';
import { sweetAlertOptions } from '@/utils/sweetAlertOptions';
import { useRouter } from 'next/router';

interface SigninResponse {
    data: string;
    error: boolean;
}


export default function Auth(): JSX.Element {
    const router = useRouter();

    const onSubmit = async (): Promise<void> => {
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
        <div className='flex min-h-screen h-fit pb-4 bg-cyan-700 items-center'>
            <div className="container px-4 mx-auto">
                <div className='bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm-max:m-5 py-10 px-4 sm:px-10'>
                    <div className="max-w-lg mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Faça login</h2>
                        </div>
                        <button onClick={onSubmit}>
                            clicar
                        </button>
                        <form action="">
                            <div className="mb-6">
                                <label className="block mb-2 font-extrabold">E-mail</label>
                                <input className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-cyan-700 bg-white shadow border-2 border-cyan-700 rounded" placeholder="Ex.: felipe@gmail.com" type="email" />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 font-extrabold">Senha</label>
                                <input className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-cyan-700 bg-white shadow border-2 border-cyan-700 rounded" placeholder="**********" type="password" />
                            </div>
                            <button className="flex gap-2 items-center justify-center w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-cyan-800 hover:bg-cyan-900 border-3 border-indigo-900 shadow rounded transition duration-200">
                                <FaSignInAlt className='w-6 h-6' /> Entrar
                            </button>
                            <p className="text-center font-extrabold">Sem conta? <a className="link text-cyan-700 link-hover" href="#">Registre-se</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}