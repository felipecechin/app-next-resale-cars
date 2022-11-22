export default function Page500(): JSX.Element {
    return (
        <>
            <div className='flex min-h-full flex-col bg-white pt-16 pb-12'>
                <main className='mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8'>
                    <div className='py-16'>
                        <div className='text-center'>
                            <h1 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
                                Oops! Ocorreu um erro.
                            </h1>
                            <p className='mt-2 text-base text-gray-500'>
                                Desculpe, um erro ocorreu durante o carregamento
                                da página anterior. Não hesite em contatar-nos.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
