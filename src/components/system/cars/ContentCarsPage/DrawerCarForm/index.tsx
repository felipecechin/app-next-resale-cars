import * as yup from 'yup'

import { useCallback, useEffect } from 'react'

import Drawer from '@/components/shared/Drawer'
import InputGroup from '@/components/shared/form/InputGroup'
import SelectGroup from '@/components/shared/form/SelectGroup'
import { SubmitHandler } from 'react-hook-form'
import { TCar } from '@/types/cars'
import fetcher from '@/utils/fetcher'
import lodashIsEmpty from 'lodash/isEmpty'
import { reactSwal } from '@/utils/reactSwal'
import { sweetAlertOptions } from '@/utils/sweetAlertOptions'
import { useAuth } from '@/contexts/AuthContext'
import { useFormWithSchema } from '@/hooks/useFormWithSchema'
import { yupMessages } from '@/utils/yupMessages'

const carSchema = yup.object({
    brand: yup.string().required(yupMessages.required),
    model: yup.string().required(yupMessages.required),
    km: yup
        .number()
        .typeError(yupMessages.typeNumber)
        .min(0, 'Por favor, informe um número maior ou igual a 0')
        .required(yupMessages.required),
    color: yup.string().required(yupMessages.required),
    transmission: yup.string().required(yupMessages.required),
})

interface IDrawerCarFormProps {
    open: boolean
    onClose: () => void
    carSelectedToUpdate: TCar
    onCarSaved: (action: 'create' | 'update', car?: TCar) => void
}

function DrawerCarForm({ open, onClose, carSelectedToUpdate, onCarSaved }: IDrawerCarFormProps): JSX.Element {
    const { token } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useFormWithSchema(carSchema)

    useEffect(() => {
        if (!lodashIsEmpty(carSelectedToUpdate)) {
            reset({
                brand: carSelectedToUpdate.brand,
                model: carSelectedToUpdate.model,
                km: Number(carSelectedToUpdate.km),
                color: carSelectedToUpdate.color,
                transmission: carSelectedToUpdate.transmission,
            })
        } else {
            reset({})
        }
    }, [carSelectedToUpdate, reset])

    const submitCarForm = useCallback<SubmitHandler<yup.Asserts<typeof carSchema>>>(
        async (data): Promise<void> => {
            reactSwal.fire({
                title: 'Por favor, aguarde...',
                allowEscapeKey: false,
                allowOutsideClick: false,
            })
            reactSwal.showLoading(null)
            try {
                let method = 'POST'
                let url = '/cars'
                if (!lodashIsEmpty(carSelectedToUpdate)) {
                    method = 'PUT'
                    url = '/cars/' + carSelectedToUpdate.id
                }

                await fetcher({
                    url,
                    method,
                    data,
                    auth: token,
                })

                reactSwal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Carro guardado com sucesso!',
                    confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                })
                if (!lodashIsEmpty(carSelectedToUpdate)) {
                    onCarSaved('update', {
                        id: carSelectedToUpdate.id,
                        ...data,
                    } as unknown as TCar)
                } else {
                    onCarSaved('create')
                }
                onClose()
            } catch (e) {
                reactSwal.fire({
                    title: 'Oops!',
                    icon: 'error',
                    text: 'Ocorreu algum erro',
                    confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                })
            }
        },
        [carSelectedToUpdate, onCarSaved, onClose, token]
    )

    return (
        <Drawer
            onClose={onClose}
            open={open}
            title='Cadastro de carro'
        >
            <form
                className='flex h-full flex-col divide-y divide-gray-200 bg-white border-t-2'
                onSubmit={handleSubmit(submitCarForm)}
            >
                <div className='flex-1 flex flex-col overflow-y-auto px-4 space-y-2 py-4'>
                    <InputGroup
                        error={errors.brand?.message as string}
                        label='Marca'
                        name='brand'
                        register={register}
                    />
                    <InputGroup
                        error={errors.model?.message as string}
                        label='Modelo'
                        name='model'
                        register={register}
                    />
                    <InputGroup
                        error={errors.km?.message as string}
                        label='Quilometragem'
                        name='km'
                        register={register}
                        type='number'
                    />
                    <InputGroup
                        error={errors.color?.message as string}
                        label='Cor'
                        name='color'
                        register={register}
                    />
                    <SelectGroup
                        error={errors.transmission?.message as string}
                        label='Câmbio'
                        name='transmission'
                        register={register}
                    />
                </div>
                <div className='flex flex-shrink-0 justify-end px-4 py-4 items-center'>
                    <button
                        className='btn bg-cyan-700'
                        type='submit'
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </Drawer>
    )
}

export default DrawerCarForm
