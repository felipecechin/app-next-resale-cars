import ContentHistoryPage from '@/components/system/history/ContentHistoryPage';
import Header from '@/components/shared/template/Header';
import MainContent from '@/components/shared/template/MainContent';

export default function Cars(): JSX.Element {
    return (
        <>
            <Header
                pageTitle='Histórico de ações'
            />
            <MainContent>
                <ContentHistoryPage />
            </MainContent>
            {/* <Footer/> */}
        </>
    )
}
