import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TAction } from '@/types/actions';
import Table from '@/components/shared/Table';
import _ from 'lodash';
import fetcher from '@/utils/fetcher';
import { getFormattedDateHour } from '@/utils/getFormattedDateHour';
import { reactSwal } from '@/utils/reactSwal';
import { sweetAlertOptions } from '@/utils/sweetAlertOptions';

const historyTableHeader = [
    {
        key: 'user',
        label: 'Usuário'
    },
    {
        key: 'car',
        label: 'Carro'
    },
    {
        key: 'dateHour',
        label: 'Data e hora'
    },
    {
        key: 'action',
        label: 'Ação'
    }
]

type TUser = {
    name: string;
    id: number;
}

interface IFetchResponseUsersSuccess {
    users: TUser[];
}

interface IFetchResponseHistorySuccess {
    actions: TAction[];
    total: number;
}

interface IContentHistoryPageProps {
    actions: TAction[];
    total: number;
    token: string;
}

function ContentHistoryPage({ actions, total, token }: IContentHistoryPageProps): JSX.Element {
    const [stateActions, setStateActions] = useState<{ actions: TAction[], total: number, actualPage: number }>({
        actions,
        total,
        actualPage: 1
    });
    const [users, setUsers] = useState<TUser[]>([]);
    const filterUser = useRef<HTMLSelectElement>(null);
    const filterAction = useRef<HTMLSelectElement>(null);

    const handleSearchHistory = useCallback(async (page = 1) => {
        let queryParams = '?page=' + page
        if (filterUser.current?.value && filterUser.current.value !== '') {
            queryParams = queryParams + '&user=' + filterUser.current.value
        }
        if (filterAction.current?.value && filterAction.current.value !== '') {
            queryParams = queryParams + '&type=' + filterAction.current.value
        }

        reactSwal.fire({
            title: 'Por favor, aguarde...',
            allowEscapeKey: false,
            allowOutsideClick: false,
        });
        reactSwal.showLoading();
        try {
            const response = await fetcher<IFetchResponseHistorySuccess, void>({
                method: 'GET',
                url: '/actions' + queryParams,
                auth: token
            });

            if (!response.error) {
                const responseSuccess = response.data as IFetchResponseHistorySuccess;
                setStateActions({
                    actions: responseSuccess.actions,
                    total: responseSuccess.total,
                    actualPage: page
                });
                reactSwal.close();
                return
            }

            throw new Error();
        } catch (e) {
            reactSwal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'Ocorreu algum erro ao buscar os dados',
                confirmButtonColor: sweetAlertOptions.confirmButtonColor,
            })
        }
    }, [token])

    useEffect(() => {
        const getUsers = async (): Promise<void> => {
            const response = await fetcher<IFetchResponseUsersSuccess, void>({
                method: 'GET',
                url: '/users',
                auth: token
            });

            if (!response.error) {
                const responseSuccess = response.data as IFetchResponseUsersSuccess;
                setUsers(responseSuccess.users);
            }
        }
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const selectUsersOptions = useMemo(() => {
        return _.map(users, (user) => {
            return (
                <option key={user.id} value={user.id}>{user.name}</option>
            )
        })
    }, [users])

    const historyTableData = useMemo(() => {
        return _.map(stateActions.actions, (action) => {
            return {
                id: action.id,
                user: action.user.name,
                car: action.car.brand + ' - ' + action.car.model,
                dateHour: getFormattedDateHour(action.occurrence),
                action: action.type === 'C' ? 'Cadastro' : action.type === 'U' ? 'Atualização' : 'Deleção'
            }
        });
    }, [stateActions])

    return (
        <div className='bg-white rounded-lg shadow-lg px-4 py-2'>
            <div className='flex justify-between my-4 flex-col sm:flex-row'>
                <select
                    className="select select-bordered w-full sm:w-auto md:max-w-xs"
                    defaultValue=''
                    onChange={() => handleSearchHistory()}
                    ref={filterUser}
                >
                    <option value=''>Sem filtro de usuário</option>
                    {selectUsersOptions}
                </select>
                <select
                    className="select select-bordered w-full sm:w-auto md:max-w-xs mt-2 sm:mt-0"
                    defaultValue=''
                    onChange={() => handleSearchHistory()}
                    ref={filterAction}
                >
                    <option value=''>Sem filtro de ação</option>
                    <option value='C'>Cadastro</option>
                    <option value='U'>Atualização</option>
                    <option value='D'>Deleção</option>
                </select>
            </div>
            <Table
                actualPage={stateActions.actualPage}
                data={historyTableData}
                header={historyTableHeader}
                idObjectKey='id'
                onChangePage={handleSearchHistory}
                totalRecords={stateActions.total}
            />
        </div>
    )
}

export default ContentHistoryPage;