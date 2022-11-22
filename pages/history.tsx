import ContentHistoryPage from '@/components/system/history/ContentHistoryPage'
import Footer from '@/components/shared/template/Footer'
import { GetServerSideProps } from 'next'
import Header from '@/components/shared/template/Header'
import MainContent from '@/components/shared/template/MainContent'
import { TAction } from '@/types/actions'
import fetcher from '@/utils/fetcher'
import { withSSRAuth } from '@/utils/withSSRAuth'

interface IFetchResponseHistorySuccess {
    actions: TAction[]
    total: number
}

interface IHistoryProps {
    actions: TAction[]
    total: number
}

export default function History({
    actions,
    total,
}: IHistoryProps): JSX.Element {
    return (
        <>
            <Header pageTitle='Histórico de ações' />
            <MainContent>
                <ContentHistoryPage
                    actions={actions}
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
            url: '/actions',
            auth: token,
        })) as IFetchResponseHistorySuccess

        let actions: TAction[] = []
        let total = 0

        actions = response.actions
        total = response.total

        return {
            props: {
                actions,
                total,
            },
        }
    }
)
