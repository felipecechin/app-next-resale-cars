import Table from '@/components/shared/Table';
import { useMemo } from 'react';

const historyTableHeader = [
    {
        key: 'name',
        label: 'Nome'
    },
    {
        key: 'age',
        label: 'Idade'
    },
    {
        key: 'buttons',
        label: ''
    }
]

function ContentHistoryPage(): JSX.Element {
    const historyTableData = useMemo(() => {
        return [
            {
                name: 'Felipe',
                age: 21,
                label: '32131',
            },
            {
                name: 'Teste',
                age: 31,
                label: '3214242',
            }
        ]
    }, [])

    return (
        <div className='bg-white rounded-lg shadow-lg px-4 py-2'>
            <div className='flex justify-between my-4 flex-col-reverse sm:flex-row gap-4'>
                <select className="select select-bordered w-full max-w-xs">
                    <option selected>Sem filtro de usuário</option>
                    <option>Homer</option>
                    <option>Marge</option>
                </select>
                <select className="select select-bordered w-full max-w-xs">
                    <option selected>Sem filtro de ação</option>
                    <option>Homer</option>
                    <option>Marge</option>
                </select>
            </div>
            <Table
                data={historyTableData}
                header={historyTableHeader}
                idObjectKey='label'
                totalRecords={10}
            />
        </div>
    )
}

export default ContentHistoryPage;