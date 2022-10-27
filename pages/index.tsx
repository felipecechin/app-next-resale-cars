import Header from '@/components/shared/template/Header';
import MainContent from '@/components/shared/template/MainContent';

export default function Home(): JSX.Element {
    return (
        <>
            <Header
                pageTitle='Dashboard'
            />
            <MainContent>
                <div className="bg-gray-100 w-full rounded-lg min-h-[32rem]">

                </div>
            </MainContent>
            {/* <Footer/> */}
        </>
    )
}
