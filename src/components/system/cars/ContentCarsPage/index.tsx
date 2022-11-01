import { FaPlus, FaSearch } from 'react-icons/fa';
import { useCallback, useMemo, useRef, useState } from 'react';

import DrawerCarForm from './DrawerCarForm';
import { TCar } from '@/types/cars';
import Table from '@/components/shared/Table';
import TableManagementButtons from '@/components/shared/TableManagementButtons';
import _ from 'lodash';
import { reactSwal } from '@/utils/reactSwal';
import { sweetAlertOptions } from '@/utils/sweetAlertOptions';

const carsTableHeader = [
    {
        key: 'name',
        label: 'Marca'
    },
    {
        key: 'age',
        label: 'Modelo'
    },
    {
        key: 'color',
        label: 'Cor'
    },
    {
        key: 'km',
        label: 'Quilometragem'
    },
    {
        key: 'transmission',
        label: 'Câmbio'
    },
    {
        key: 'buttons',
        label: ''
    }
]

interface IContentCarsPageProps {
    cars: TCar[];
    total: number;
    token: string;
}

function ContentCarsPage({ cars, total, token }: IContentCarsPageProps): JSX.Element {
    const [carFormDrawer, setCarFormDrawer] = useState(false);
    const [stateCars, setStateCars] = useState<{ cars: TCar[], total: number, actualPage: number }>({
        cars,
        total,
        actualPage: 0
    });
    const inputSearchRef = useRef<HTMLInputElement>(null)

    const handleSearchCars = useCallback(() => {

    }, [])

    const handleDeleteCar = useCallback((id: number) => {
        reactSwal.fire({
            title: 'Tem certeza que deseja remover o carro?',
            cancelButtonColor: sweetAlertOptions.cancelButtonColor,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: sweetAlertOptions.confirmButtonColor,
            confirmButtonText: 'Sim, remover',
            icon: 'question',
            showCancelButton: true,
            text: 'Esta ação é irreversível',
        }).then(async (result) => {
            if (result.isConfirmed) {
                reactSwal.fire({
                    title: 'Por favor, aguarde...',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                });
                reactSwal.showLoading();
                try {

                } catch (e) {
                    reactSwal.fire({
                        title: 'Oops!',
                        icon: 'error',
                        text: 'Ocorreu algum erro ao remover carro',
                        confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                    })
                }
            }
        })
    }, []);

    const handleUpdateCar = useCallback(() => {

    }, [])

    const getTableButtons = useCallback((car: TCar) => {
        return (
            <span className="flex justify-end">
                <TableManagementButtons
                    onDelete={() => handleDeleteCar(car.id)}
                    onUpdate={() => console.log('update')}
                />
            </span>
        )
    }, [handleDeleteCar]);

    const handleCarSaved = useCallback(() => {

    }, []);

    const carsTableData = useMemo(() => {
        return _.map(stateCars.cars, (car) => {
            return {
                ...car,
                buttons: getTableButtons(car)
            }
        });
    }, [getTableButtons, stateCars])

    return (
        <div className='bg-white rounded-lg shadow-lg px-4 py-2'>
            <div className='flex justify-between my-4 flex-col-reverse sm:flex-row'>
                <span className='flex flex-col sm:flex-row sm:basis-96 mt-2 sm:mt-0'>
                    <input className='input input-bordered w-full max-w-3xl' placeholder='Pesquisar pelo modelo ou marca' ref={inputSearchRef} type='text' />
                    <button className='btn bg-cyan-700 mt-1 sm:mt-0 sm:ml-1'>
                        <FaSearch className='w-5 h-6' />
                    </button>
                </span>
                <button className='btn bg-cyan-700' onClick={() => setCarFormDrawer(true)}>
                    <FaPlus className='mr-1' /> Novo carro
                </button>
            </div>
            <Table
                actualPage={stateCars.actualPage}
                data={carsTableData}
                header={carsTableHeader}
                idObjectKey='label'
                onChangePage={handleSearchCars}
                totalRecords={10}
            />
            <DrawerCarForm
                onClose={() => setCarFormDrawer(false)}
                open={carFormDrawer}
            />
        </div>
    )
}

export default ContentCarsPage;