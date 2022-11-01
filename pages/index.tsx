import { FaCar, FaCogs } from 'react-icons/fa';

import { GetServerSideProps } from 'next';
import Header from '@/components/shared/template/Header';
import MainContent from '@/components/shared/template/MainContent';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import fetcher from '@/utils/fetcher';
import { getToken } from '@/utils/cookies';
import { useMemo } from 'react';

type TUserAction = {
    count: number;
    name: string;
}

type TTypeActions = {
    count: number;
    type: 'C' | 'D' | 'U';
}

interface IFetchResponseDashboardSuccess {
    userActions: TUserAction[];
    typeActions: TTypeActions[];
    totalCars: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApexColumnChart = dynamic(() => import('@/components/shared/charts/apexcharts/ApexColumnChart'), {
    ssr: false,
})

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApexPieChart = dynamic(() => import('@/components/shared/charts/apexcharts/ApexPieChart'), {
    ssr: false,
})

interface IDashboardProps {
    userActions: TUserAction[];
    typeActions: TTypeActions[];
    totalCars: number;
}

export default function Dashboard({ userActions, typeActions, totalCars }: IDashboardProps): JSX.Element {
    const totalActions = useMemo(() => {
        return _.reduce(typeActions, (sum, n) => sum + n.count, 0);
    }, [typeActions])

    const typeActionsToShowOnGraphic = useMemo(() => {
        return _.map(typeActions, (typeAction) => {
            return {
                ...typeAction,
                type: typeAction.type === 'C' ? 'Cadastro' : typeAction.type === 'U' ? 'Atualização' : 'Deleção',
            }
        })
    }, [typeActions])

    return (
        <>
            <Header
                pageTitle='Dashboard'
            />
            <MainContent>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className="bg-white rounded-lg shadow-lg flex flex-col py-4 px-4">
                        <div className='flex items-center'>
                            <span className='p-4 rounded-lg border border-cyan-700 bg-gray-100 mr-2'>
                                <FaCar className='text-cyan-700 w-6 h-6' />
                            </span>
                            <span className='text-4xl text-gray-600 font-bold mr-2'>
                                {totalCars}
                            </span>
                            <p className='text-lg text-gray-600 font-semibold'>
                                carros cadastrados
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg flex flex-col py-4 px-4">
                        <div className='flex items-center'>
                            <span className='p-4 rounded-lg border border-cyan-700 bg-gray-100 mr-2'>
                                <FaCogs className='text-cyan-700 w-6 h-6' />
                            </span>
                            <span className='text-4xl text-gray-600 font-bold mr-2'>
                                {totalActions}
                            </span>
                            <p className='text-lg text-gray-600 font-semibold'>
                                ações realizadas
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg flex flex-col py-4 px-4">
                        <h2 className='text-cyan-700 font-bold text-xl my-2'>
                            Número de ações por usuário cadastrado
                        </h2>
                        <ApexColumnChart
                            categoriesKey='name'
                            data={userActions}
                            dataKey='count'
                            dataName='Número de ações do usuário'
                            height={['300px']}
                            id="number-actions"
                        />
                    </div>
                    <div className="bg-white rounded-lg shadow-lg flex flex-col py-4 px-4">
                        <h2 className='text-cyan-700 font-bold text-xl my-2'>
                            Número de ocorrências de cada ação
                        </h2>
                        <span
                            className='flex-grow flex items-center justify-center'
                        >
                            <ApexPieChart
                                data={typeActionsToShowOnGraphic}
                                labelsKey='type'
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
                                seriesKey='count'
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

export const getServerSideProps: GetServerSideProps = async ({ resolvedUrl, req }) => {
    const token = getToken(req)
    if (!token) {
        return {
            redirect: {
                destination: '/auth?redirect=' + encodeURIComponent(resolvedUrl),
                permanent: false
            }
        };
    }

    const response = await fetcher<IFetchResponseDashboardSuccess, void>({
        method: 'GET',
        url: '/dashboard',
        auth: token
    });

    let userActions: TUserAction[] = [];
    let typeActions: TTypeActions[] = [];
    let totalCars = 0;

    if (!response.error) {
        const responseSuccess = response.data as IFetchResponseDashboardSuccess;
        userActions = responseSuccess.userActions;
        typeActions = responseSuccess.typeActions;
        totalCars = responseSuccess.totalCars;
    }

    return {
        props: {
            userActions,
            typeActions,
            totalCars
        }
    }
};