import ContentHistoryPage from '@/components/system/history/ContentHistoryPage';
import { GetServerSideProps } from 'next';
import Header from '@/components/shared/template/Header';
import MainContent from '@/components/shared/template/MainContent';
import { TAction } from '@/types/actions';
import fetcher from '@/utils/fetcher';
import { getToken } from '@/utils/cookies';

interface IFetchResponseHistorySuccess {
    actions: TAction[];
    total: number;
}

interface IHistoryProps {
    actions: TAction[];
    total: number;
    token: string;
}

export default function History({ actions, total, token }: IHistoryProps): JSX.Element {
    return (
        <>
            <Header
                pageTitle='Histórico de ações'
            />
            <MainContent>
                <ContentHistoryPage
                    actions={actions}
                    token={token}
                    total={total}
                />
            </MainContent>
            {/* <Footer/> */}
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

    const response = await fetcher<IFetchResponseHistorySuccess, void>({
        method: 'GET',
        url: '/actions',
        auth: token
    });

    let actions: TAction[] = [];
    let total = 0;

    if (!response.error) {
        const responseSuccess = response.data as IFetchResponseHistorySuccess;
        actions = responseSuccess.actions;
        total = responseSuccess.total;
    }

    return {
        props: {
            actions,
            total,
            token
        }
    }
};
