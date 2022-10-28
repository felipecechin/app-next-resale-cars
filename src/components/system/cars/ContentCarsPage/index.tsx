import { FaPlus, FaSearch } from 'react-icons/fa';
import { useCallback, useMemo, useState } from 'react';

import DrawerCarForm from './DrawerCarForm';
import Swal from 'sweetalert2'
import Table from '@/components/shared/Table';
import TableManagementButtons from '@/components/shared/TableManagementButtons';
import { sweetAlertOptions } from '@/utils/sweetAlertOptions';
import withReactContent from 'sweetalert2-react-content'

const mySwal = withReactContent(Swal)

const carsTableHeader = [
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

function ContentCarsPage(): JSX.Element {
    const [carFormDrawer, setCarFormDrawer] = useState(false);

    const handleDeleteCar = useCallback(() => {
        mySwal.fire({
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
                mySwal.fire({
                    title: 'Por favor, aguarde...',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                });
                mySwal.showLoading();
                try {
                    // const source = 'removeAdvertising'
                    // const data = {
                    //     label: advertising.label,
                    // }
                    // const result = await fetcher({
                    //     type: 'post',
                    //     data: {
                    //         source,
                    //         variableValues: data,
                    //     },
                    //     auth: token,
                    //     checker: licenseLabel
                    // });

                    // console.log(result);
                    // if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
                    //     MySwal.fire({
                    //         title: 'Oops!',
                    //         icon: 'error',
                    //         text: getFriendlyMessage(source, result.errors[0]?.message, 'errors', language.code),
                    //         confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                    //     })
                    //     return;
                    // }

                    // if (Object.prototype.hasOwnProperty.call(result?.data, source)) {
                    //     MySwal.fire({
                    //         title: capitalizeFirstLetter(language.words.success),
                    //         icon: 'success',
                    //         text: getFriendlyMessage(source, result.data[source], 'success', language.code),
                    //         confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                    //     })
                    //     setAdvertisingsToShowOnTable((oldState) => {
                    //         const advertisingsCopy = [...oldState];
                    //         advertisingsCopy.splice(index, 1);
                    //         return advertisingsCopy
                    //     })
                    // }
                } catch (e) {
                    mySwal.fire({
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

    const getTableButtons = useCallback(() => {
        return (
            <span className="flex justify-end">
                <TableManagementButtons
                    onDelete={() => handleDeleteCar()}
                    onUpdate={() => console.log('update')}
                />
            </span>
        )
    }, [handleDeleteCar]);

    const handleCarSaved = useCallback(() => {

    }, []);

    const carsTableData = useMemo(() => {
        return [
            {
                name: 'Felipe',
                age: 21,
                label: '32131',
                buttons: getTableButtons()
            },
            {
                name: 'Teste',
                age: 31,
                label: '3214242',
                buttons: getTableButtons()
            }
        ]
    }, [getTableButtons])

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
            <DrawerCarForm
                onClose={() => setCarFormDrawer(false)}
                open={carFormDrawer}
            />
        </div>
    )
}

export default ContentCarsPage;