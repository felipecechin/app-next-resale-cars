import ContentCarsPage from '@/components/system/cars/ContentCarsPage';
import Header from '@/components/shared/template/Header';
import MainContent from '@/components/shared/template/MainContent';

export default function Cars(): JSX.Element {
    return (
        <>
            <Header
                pageTitle='Carros'
            />
            <MainContent>
                <ContentCarsPage />
            </MainContent>
            {/* <Footer/> */}
        </>
    )
}
