import ContentCarsPage from '@/components/system/cars/ContentCarsPage'
import Footer from '@/components/shared/template/Footer'
import Header from '@/components/shared/template/Header'
import { InferGetServerSidePropsType } from 'next'
import MainContent from '@/components/shared/template/MainContent'
import { TCar } from '@/types/cars'
import fetcher from '@/utils/fetcher'
import { withSSRAuth } from '@/utils/withSSRAuth'

interface IFetchResponseCarsSuccess {
    cars: TCar[]
    total: number
}

type TCarsProps = IFetchResponseCarsSuccess

export const getServerSideProps = withSSRAuth<TCarsProps>(async ({ token }) => {
    const response = (await fetcher({
        method: 'GET',
        url: '/cars',
        auth: token,
    })) as IFetchResponseCarsSuccess

    const cars = response.cars
    const total = response.total

    return {
        props: {
            cars,
            total,
        },
    }
})

export default function Cars({ cars, total }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    return (
        <>
            <Header pageTitle='Carros' />
            <MainContent>
                <ContentCarsPage
                    cars={cars}
                    total={total}
                />
            </MainContent>
            <Footer />
        </>
    )
}
