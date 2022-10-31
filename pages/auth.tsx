import { useMemo, useState } from 'react';

import LoginForm from '@/components/system/auth/LoginForm';
import RegisterForm from '@/components/system/auth/RegisterForm';

export default function Auth(): JSX.Element {
    const [showForm, setShowForm] = useState<'login' | 'register'>('login')

    const getLinkTextChangeForm = useMemo(() => {
        return showForm === 'login' ? (
            <p className="text-center font-extrabold">Sem conta?
                {' '}<button className="link text-cyan-700 link-hover" onClick={() => setShowForm('register')} type="button">
                    Registre-se
                </button>
            </p>
        ) : (
            <p className="text-center font-extrabold">
                <button className="link text-cyan-700 link-hover" onClick={() => setShowForm('login')} type="button">
                    Faça login
                </button>
            </p>
        )
    }, [showForm])

    return (
        <div className='flex min-h-screen h-fit py-4 bg-cyan-700 items-center'>
            <div className="container px-4 mx-auto">
                <div className='bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm-max:m-5 py-10 px-4 sm:px-10'>
                    <div className="max-w-lg mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
                                {showForm === 'login' ? 'Faça login' : 'Faça seu cadastro'}
                            </h2>
                        </div>
                        {showForm === 'login' && <LoginForm />}
                        {showForm === 'register' && <RegisterForm />}
                        {getLinkTextChangeForm}
                    </div>
                </div>
            </div>
        </div>
    )
}