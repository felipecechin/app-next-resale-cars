import { FaPlus, FaSearch } from 'react-icons/fa';
import { useMemo, useState } from 'react';

import Drawer from '@/components/shared/Drawer';
import Table from '@/components/shared/Table';
import TableManagementButtons from '@/components/shared/TableManagementButtons';

function ContentCarsPage(): JSX.Element {
    const [carFormDrawer, setCarFormDrawer] = useState(false);

    const carsTableHeader = useMemo(() => {
        return [
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
                label: 'Ações'
            }
        ]
    }, []);

    const carsTableData = useMemo(() => {
        return [
            {
                name: 'Felipe',
                age: 21,
                label: '32131',
                buttons: <TableManagementButtons
                    onDelete={() => console.log('delete')}
                    onUpdate={() => console.log('update')}
                />
            },
            {
                name: 'Teste',
                age: 31,
                label: '3214242',
                buttons: <TableManagementButtons
                    onDelete={() => console.log('delete')}
                    onUpdate={() => console.log('update')}
                />
            }
        ]
    }, [])

    return (
        <div className='bg-white rounded-lg shadow-lg px-4 py-2'>
            <div className='flex justify-between my-4 flex-col-reverse sm:flex-row gap-4'>
                <span className='flex flex-col sm:flex-row sm:basis-96 gap-2'>
                    <input className='input input-bordered w-full max-w-3xl' placeholder='Pesquisar pelo modelo ou marca' type='text' />
                    <button className='btn bg-cyan-700'>
                        <FaSearch className='w-5 h-6' />
                    </button>
                </span>
                <button className='btn bg-cyan-700' onClick={() => setCarFormDrawer(true)}>
                    <FaPlus className='mr-1' /> Novo carro
                </button>
            </div>
            <Table
                data={carsTableData}
                header={carsTableHeader}
                idObjectKey='label'
                totalRecords={10}
            />
            <Drawer
                onClose={() => setCarFormDrawer(false)}
                open={carFormDrawer}
                title='Cadastro de carro'
            >
                <div>
                    teste
                </div>
            </Drawer>
        </div>
    )
}

export default ContentCarsPage;