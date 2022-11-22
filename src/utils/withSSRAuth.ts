/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    PreviewData,
} from 'next'

import { ParsedUrlQuery } from 'querystring'
import { getToken } from '@/utils/cookies'

interface IPagePropsWithToken
    extends GetServerSidePropsContext<ParsedUrlQuery, PreviewData> {
    token: string
}

type TGetServerSidePropsWithToken<
    P extends { [key: string]: any } = { [key: string]: any }
> = (context: IPagePropsWithToken) => Promise<GetServerSidePropsResult<P>>

export function withSSRAuth<P extends { [key: string]: any }>(
    fn: TGetServerSidePropsWithToken<P>
): GetServerSideProps {
    return async (
        ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    ): Promise<GetServerSidePropsResult<P>> => {
        const token = getToken(ctx.req)

        if (!token) {
            return {
                redirect: {
                    destination:
                        '/auth?redirect=' + encodeURIComponent(ctx.resolvedUrl),
                    permanent: false,
                },
            }
        }

        return await fn({ ...ctx, token })
    }
}
