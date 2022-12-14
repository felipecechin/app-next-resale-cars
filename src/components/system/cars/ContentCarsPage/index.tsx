import { FaPlus, FaSearch } from 'react-icons/fa'
import reactSwal, {
    closeSwal,
    showSwalError,
    showSwalLoading,
    showSwalSuccess,
    sweetAlertOptions,
} from '@/utils/reactSwal'
import { useCallback, useMemo, useRef, useState } from 'react'

import DrawerCarForm from './DrawerCarForm'
import { TCar } from '@/types/cars'
import Table from '@/components/shared/Table'
import TableManagementButtons from '@/components/shared/TableManagementButtons'
import fetcher from '@/utils/fetcher'
import lodashMap from 'lodash/map'
import { useAuth } from '@/contexts/AuthContext'

const carsTableHeader = [
    {
        key: 'brand',
        label: 'Marca',
    },
    {
        key: 'model',
        label: 'Modelo',
    },
    {
        key: 'color',
        label: 'Cor',
    },
    {
        key: 'km',
        label: 'Quilometragem',
    },
    {
        key: 'transmission',
        label: 'Câmbio',
    },
    {
        key: 'buttons',
        label: '',
    },
]

interface IContentCarsPageProps {
    cars: TCar[]
    total: number
}

interface IFetchResponseCarsSuccess {
    cars: TCar[]
    total: number
}

function ContentCarsPage({ cars, total }: IContentCarsPageProps): JSX.Element {
    const { token } = useAuth()
    const [carFormDrawer, setCarFormDrawer] = useState<{
        open: boolean
        carSelected: TCar
    }>({
        open: false,
        carSelected: {} as TCar,
    })
    const [stateCars, setStateCars] = useState<{
        cars: TCar[]
        total: number
        actualPage: number
    }>({
        cars,
        total,
        actualPage: 1,
    })
    const [loadingCars, setLoadingCars] = useState(false)
    const inputSearchRef = useRef<HTMLInputElement>(null)

    const handleSearchCars = useCallback(
        async (page = 1, resetSearch = false, showSweetAlertLoading = true) => {
            let queryParams = '?page=' + page
            if (resetSearch) {
                if (inputSearchRef.current) {
                    inputSearchRef.current.value = ''
                }
            }

            if (inputSearchRef.current?.value && inputSearchRef.current.value !== '') {
                queryParams = queryParams + '&search=' + inputSearchRef.current.value
            }

            if (showSweetAlertLoading) {
                showSwalLoading()
            } else {
                setLoadingCars(true)
            }
            try {
                const response = (await fetcher({
                    method: 'GET',
                    url: '/cars' + queryParams,
                    auth: token,
                })) as IFetchResponseCarsSuccess

                setStateCars({
                    cars: response.cars,
                    total: response.total,
                    actualPage: page,
                })
                if (showSweetAlertLoading) {
                    closeSwal()
                } else {
                    setLoadingCars(false)
                }
            } catch (e) {
                showSwalError('Ocorreu algum erro ao buscar os dados')
            }
        },
        [token]
    )

    const handleDeleteCar = useCallback(
        (id: number) => {
            reactSwal
                .fire({
                    title: 'Tem certeza que deseja remover o carro?',
                    cancelButtonColor: sweetAlertOptions.cancelButtonColor,
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                    confirmButtonText: 'Sim, remover',
                    icon: 'question',
                    showCancelButton: true,
                    text: 'Esta ação é irreversível',
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        showSwalLoading()
                        try {
                            await fetcher({
                                method: 'DELETE',
                                url: '/cars/' + id,
                                auth: token,
                            })

                            showSwalSuccess('Carro deletado com sucesso!')
                            handleSearchCars(1, false, false)
                        } catch (e) {
                            showSwalError('Ocorreu algum erro ao remover carro')
                        }
                    }
                })
        },
        [token, handleSearchCars]
    )

    const handleNewCar = useCallback(() => {
        setCarFormDrawer({
            open: true,
            carSelected: {} as TCar,
        })
    }, [])

    const handleUpdateCar = useCallback((car: TCar) => {
        setCarFormDrawer({
            open: true,
            carSelected: car,
        })
    }, [])

    const getTableButtons = useCallback(
        (car: TCar) => {
            return (
                <span className='flex justify-end'>
                    <TableManagementButtons
                        onDelete={() => handleDeleteCar(car.id)}
                        onUpdate={() => handleUpdateCar(car)}
                    />
                </span>
            )
        },
        [handleDeleteCar, handleUpdateCar]
    )

    const handleCarSaved = useCallback(
        (action: 'update' | 'create', car?: TCar) => {
            if (action === 'create') {
                handleSearchCars(1, true, false)
            } else {
                const newCars = lodashMap(stateCars.cars, (c) => {
                    if (c.id === car?.id) {
                        return car as TCar
                    }
                    return c
                })
                setStateCars({
                    ...stateCars,
                    cars: newCars,
                })
            }
        },
        [handleSearchCars, stateCars]
    )

    const carsTableData = useMemo(() => {
        return lodashMap(stateCars.cars, (car) => {
            return {
                ...car,
                km: car.km + ' km',
                buttons: getTableButtons(car),
            }
        })
    }, [getTableButtons, stateCars])

    return (
        <div className='bg-white rounded-lg shadow-lg px-4 py-2'>
            <div className='flex justify-between my-4 flex-col-reverse sm:flex-row'>
                <span className='flex flex-col sm:flex-row sm:basis-96 mt-2 sm:mt-0'>
                    <input
                        className='input input-bordered w-full max-w-3xl'
                        placeholder='Pesquisar pelo modelo ou marca'
                        ref={inputSearchRef}
                        type='text'
                    />
                    <button
                        className='btn bg-cyan-700 mt-1 sm:mt-0 sm:ml-1'
                        onClick={() => handleSearchCars()}
                    >
                        <FaSearch className='w-5 h-6' />
                    </button>
                </span>
                <button
                    className='btn bg-cyan-700'
                    onClick={handleNewCar}
                >
                    <FaPlus className='mr-1' /> Novo carro
                </button>
            </div>
            <Table
                actualPage={stateCars.actualPage}
                data={carsTableData}
                header={carsTableHeader}
                idObjectKey='id'
                loading={loadingCars}
                onChangePage={handleSearchCars}
                totalRecords={stateCars.total}
            />
            <DrawerCarForm
                carSelectedToUpdate={carFormDrawer.carSelected}
                onCarSaved={handleCarSaved}
                onClose={() =>
                    setCarFormDrawer({
                        ...carFormDrawer,
                        open: false,
                    })
                }
                open={carFormDrawer.open}
            />
        </div>
    )
}

export default ContentCarsPage
