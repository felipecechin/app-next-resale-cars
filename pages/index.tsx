import Header from '@/components/shared/template/Header';
import MainContent from '@/components/shared/template/MainContent';

export default function Home(): JSX.Element {
    return (
        <>
            <Header
                pageTitle='Dashboard'
            />
            <MainContent>
                <div className="bg-gray-100 w-full rounded-lg">
                    <h2>teste</h2>
                </div>
            </MainContent>
            {/* <Footer/> */}
        </>
    )
}
