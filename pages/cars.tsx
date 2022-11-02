import ContentCarsPage from '@/components/system/cars/ContentCarsPage';
import Footer from '@/components/shared/template/Footer';
import { GetServerSideProps } from 'next';
import Header from '@/components/shared/template/Header';
import MainContent from '@/components/shared/template/MainContent';
import { TCar } from '@/types/cars';
import fetcher from '@/utils/fetcher';
import { getToken } from '@/utils/cookies';

interface IFetchResponseCarsSuccess {
    cars: TCar[];
    total: number;
}

interface ICarsProps {
    cars: TCar[];
    total: number;
}

export default function Cars({ cars, total }: ICarsProps): JSX.Element {
    return (
        <>
            <Header
                pageTitle='Carros'
            />
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

    const response = await fetcher<IFetchResponseCarsSuccess, void>({
        method: 'GET',
        url: '/cars',
        auth: token
    });

    let cars: TCar[] = [];
    let total = 0;

    if (!response.error) {
        const responseSuccess = response.data as IFetchResponseCarsSuccess;
        cars = responseSuccess.cars;
        total = responseSuccess.total;
    }

    return {
        props: {
            cars,
            total
        }
    }
};
