import ContentHistoryPage from '@/components/system/history/ContentHistoryPage'
import Footer from '@/components/shared/template/Footer'
import Header from '@/components/shared/template/Header'
import { InferGetServerSidePropsType } from 'next'
import MainContent from '@/components/shared/template/MainContent'
import { TAction } from '@/types/actions'
import fetcher from '@/utils/fetcher'
import { withSSRAuth } from '@/utils/withSSRAuth'

interface IFetchResponseHistorySuccess {
    actions: TAction[]
    total: number
}

type THistoryProps = IFetchResponseHistorySuccess

export const getServerSideProps = withSSRAuth<THistoryProps>(async ({ token }) => {
    const response = (await fetcher({
        method: 'GET',
        url: '/actions/history',
        auth: token,
    })) as IFetchResponseHistorySuccess

    const actions = response.actions
    const total = response.total

    return {
        props: {
            actions,
            total,
        },
    }
})

export default function History({
    actions,
    total,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
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
