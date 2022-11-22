import ContentCarsPage from '@/components/system/cars/ContentCarsPage'
import Footer from '@/components/shared/template/Footer'
import { GetServerSideProps } from 'next'
import Header from '@/components/shared/template/Header'
import MainContent from '@/components/shared/template/MainContent'
import { TCar } from '@/types/cars'
import fetcher from '@/utils/fetcher'
import { withSSRAuth } from '@/utils/withSSRAuth'

interface IFetchResponseCarsSuccess {
    cars: TCar[]
    total: number
}

interface ICarsProps {
    cars: TCar[]
    total: number
}

export default function Cars({ cars, total }: ICarsProps): JSX.Element {
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

export const getServerSideProps: GetServerSideProps = withSSRAuth(
    async ({ token }) => {
        const response = (await fetcher({
            method: 'GET',
            url: '/cars',
            auth: token,
        })) as IFetchResponseCarsSuccess

        let cars: TCar[] = []
        let total = 0

        cars = response.cars
        total = response.total

        return {
            props: {
                cars,
                total,
            },
        }
    }
)
