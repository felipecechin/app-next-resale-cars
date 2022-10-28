import { FaCar, FaCogs } from 'react-icons/fa';

import Header from '@/components/shared/template/Header';
import MainContent from '@/components/shared/template/MainContent';
import dynamic from 'next/dynamic';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApexColumnChart = dynamic(() => import('@/components/shared/charts/apexcharts/ApexColumnChart'), {
    ssr: false,
})

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApexPieChart = dynamic(() => import('@/components/shared/charts/apexcharts/ApexPieChart'), {
    ssr: false,
})

export default function Dashboard(): JSX.Element {
    return (
        <>
            <Header
                pageTitle='Dashboard'
            />
            <MainContent>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className="bg-white rounded-lg shadow-lg flex flex-col gap-2 py-4 px-4">
                        <div className='flex items-center gap-4'>
                            <span className='p-4 bg-cyan-700 rounded-lg'>
                                <FaCar className='text-white w-6 h-6' />
                            </span>
                            <span className='text-4xl text-gray-600 font-bold'>
                                25
                            </span>
                            <p className='text-lg text-gray-600 font-semibold'>
                                carros cadastrados
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg flex flex-col gap-2 py-4 px-4">
                        <div className='flex items-center gap-4'>
                            <span className='p-4 bg-cyan-700 rounded-lg'>
                                <FaCogs className='text-white w-6 h-6' />
                            </span>
                            <span className='text-4xl text-gray-600 font-bold'>
                                30
                            </span>
                            <p className='text-lg text-gray-600 font-semibold'>
                                ações realizadas
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg flex flex-col gap-2 py-4 px-4">
                        <h2 className='text-cyan-700 font-bold text-xl my-2'>
                            Número de ações por usuário cadastrado
                        </h2>
                        <ApexColumnChart
                            categoriesKey='test'
                            data={[
                                {
                                    test: 'Felipe',
                                    value: 321
                                },
                                {
                                    test: 'Alfredo',
                                    value: 124
                                }
                            ]}
                            dataKey='value'
                            dataName='Número de ações do usuário'
                            height={['300px']}
                            id="number-actions"
                        />
                    </div>
                    <div className="bg-white rounded-lg shadow-lg flex flex-col gap-2 py-4 px-4">
                        <h2 className='text-cyan-700 font-bold text-xl my-2'>
                            Número de ocorrências de cada ação
                        </h2>
                        <span
                            className='flex-grow flex items-center justify-center'
                        >
                            <ApexPieChart
                                data={[
                                    {
                                        test: 'Cadastro',
                                        value: 321
                                    },
                                    {
                                        test: 'Atualização',
                                        value: 124
                                    }
                                ]}
                                labelsKey='test'
                                responsiveHeight={[
                                    '300px',
                                    '250px',
                                    '300px',
                                    '300px',
                                ]}
                                responsiveLegendPosition={[
                                    'bottom',
                                    'bottom',
                                    'bottom',
                                    'right',
                                ]}
                                responsiveWidth={[
                                    '100%',
                                    '100%',
                                    '100%',
                                    '400px',
                                ]}
                                seriesKey='value'
                                width="400px"
                            />
                        </span>
                    </div>
                </div>
            </MainContent>
            {/* <Footer/> */}
        </>
    )
}
