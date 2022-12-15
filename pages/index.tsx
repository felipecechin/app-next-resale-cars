import { FaCar, FaCogs } from 'react-icons/fa'

import CardContent from '@/components/shared/cards/CardContent'
import CardNumber from '@/components/shared/cards/CardNumber'
import Footer from '@/components/shared/template/Footer'
import Header from '@/components/shared/template/Header'
import { InferGetServerSidePropsType } from 'next'
import MainContent from '@/components/shared/template/MainContent'
import dynamic from 'next/dynamic'
import fetcher from '@/utils/fetcher'
import lodashMap from 'lodash/map'
import lodashReduce from 'lodash/reduce'
import { useMemo } from 'react'
import { withSSRAuth } from '@/utils/withSSRAuth'

type TUserAction = {
    count: number
    name: string
}

type TTypeActions = {
    count: number
    type: 'C' | 'D' | 'U'
}

interface IFetchResponseDashboardSuccess {
    userActions: TUserAction[]
    typeActions: TTypeActions[]
    totalCars: number
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApexColumnChart = dynamic(() => import('@/components/shared/charts/apexcharts/ApexColumnChart'), {
    ssr: false,
})

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApexPieChart = dynamic(() => import('@/components/shared/charts/apexcharts/ApexPieChart'), {
    ssr: false,
})

type TDashboardProps = IFetchResponseDashboardSuccess

export const getServerSideProps = withSSRAuth<TDashboardProps>(async ({ token }) => {
    const response = (await fetcher({
        method: 'GET',
        url: '/actions/dashboard',
        auth: token,
    })) as IFetchResponseDashboardSuccess

    const userActions = response.userActions
    const typeActions = response.typeActions
    const totalCars = response.totalCars

    return {
        props: {
            userActions,
            typeActions,
            totalCars,
        },
    }
})

export default function Dashboard({
    userActions,
    typeActions,
    totalCars,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    const totalActions = useMemo(() => {
        return lodashReduce(typeActions, (sum, n) => sum + n.count, 0)
    }, [typeActions])

    const typeActionsToShowOnGraphic = useMemo(() => {
        return lodashMap(typeActions, (typeAction) => {
            return {
                ...typeAction,
                type: typeAction.type === 'C' ? 'Cadastro' : typeAction.type === 'U' ? 'Atualização' : 'Deleção',
            }
        })
    }, [typeActions])

    return (
        <>
            <Header pageTitle='Dashboard' />
            <MainContent>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <CardNumber
                        icon={FaCar}
                        label='carros cadastrados'
                        quantity={totalCars}
                    />
                    <CardNumber
                        icon={FaCogs}
                        label='ações realizadas'
                        quantity={totalActions}
                    />
                    <CardContent title='Número de ações por usuário cadastrado'>
                        <ApexColumnChart
                            categoriesKey='name'
                            data={userActions}
                            dataKey='count'
                            dataName='Número de ações do usuário'
                            height={['300px']}
                            id='number-actions'
                        />
                    </CardContent>
                    <CardContent title='Número de ocorrências de cada ação'>
                        <span className='flex-grow flex items-center justify-center'>
                            <ApexPieChart
                                data={typeActionsToShowOnGraphic}
                                labelsKey='type'
                                responsiveHeight={['300px', '250px', '300px', '300px']}
                                responsiveLegendPosition={['bottom', 'bottom', 'bottom', 'right']}
                                responsiveWidth={['100%', '100%', '100%', '400px']}
                                seriesKey='count'
                                width='400px'
                            />
                        </span>
                    </CardContent>
                </div>
            </MainContent>
            <Footer />
        </>
    )
}
