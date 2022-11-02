import * as yup from 'yup';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';

import Drawer from '@/components/shared/Drawer';
import InputGroup from '@/components/shared/form/InputGroup';
import SelectGroup from '@/components/shared/form/SelectGroup';
import { TCar } from '@/types/cars';
import _ from 'lodash';
import fetcher from '@/utils/fetcher';
import { reactSwal } from '@/utils/reactSwal';
import { sweetAlertOptions } from '@/utils/sweetAlertOptions';
import { yupResolver } from '@hookform/resolvers/yup';

const carSchema = yup.object({
    brand: yup.string().required('Por favor, preencha o campo'),
    model: yup.string().required('Por favor, preencha o campo'),
    km: yup.number().typeError('Por favor, informe um número').min(0, 'Por favor, informe um número maior ou igual a 0').required('Por favor, preencha o campo'),
    color: yup.string().required('Por favor, preencha o campo'),
    transmission: yup.string().required('Por favor, preencha o campo'),
})

type TFormValues = {
    brand: string;
    model: string;
    km: number;
    color: string;
    transmission: string;
}

interface IFetchResponseCarFormFail {
    message: string | string[];
}

interface IDrawerCarFormProps {
    open: boolean;
    onClose: () => void;
    carSelectedToUpdate: TCar;
    onCarSaved: (action: 'create' | 'update', car?: TCar) => void;
    token: string;
}

function DrawerCarForm({ open, onClose, carSelectedToUpdate, onCarSaved, token }: IDrawerCarFormProps): JSX.Element {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TFormValues>({
        resolver: yupResolver(carSchema)
    });

    useEffect(() => {
        if (!_.isEmpty(carSelectedToUpdate)) {
            reset({
                brand: carSelectedToUpdate.brand,
                model: carSelectedToUpdate.model,
                km: Number(carSelectedToUpdate.km),
                color: carSelectedToUpdate.color,
                transmission: carSelectedToUpdate.transmission,
            });
        } else {
            reset({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carSelectedToUpdate])

    const submitCarForm = useCallback<SubmitHandler<TFormValues>>(async (data): Promise<void> => {
        console.log(data)
        reactSwal.fire({
            title: 'Por favor, aguarde...',
            allowEscapeKey: false,
            allowOutsideClick: false,
        });
        reactSwal.showLoading();
        try {
            let method = 'POST';
            let url = '/cars';
            if (!_.isEmpty(carSelectedToUpdate)) {
                method = 'PUT';
                url = '/cars/' + carSelectedToUpdate.id;
            }

            const response = await fetcher<void, IFetchResponseCarFormFail>({
                url,
                method,
                data,
                auth: token
            })

            if (!response.error) {
                reactSwal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Carro salvo com sucesso!',
                    confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                })
                if (!_.isEmpty(carSelectedToUpdate)) {
                    onCarSaved('update', { id: carSelectedToUpdate.id, ...data } as unknown as TCar);
                } else {
                    onCarSaved('create');
                }
                onClose();
                return
            }

            throw new Error();
        } catch (e) {
            reactSwal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'Ocorreu algum erro',
                confirmButtonColor: sweetAlertOptions.confirmButtonColor,
            })
        }
    }, [carSelectedToUpdate, onCarSaved, onClose, token]);

    return (
        <Drawer
            onClose={onClose}
            open={open}
            title='Cadastro de carro'
        >
            <form className='flex h-full flex-col divide-y divide-gray-200 bg-white border-t-2' onSubmit={handleSubmit(submitCarForm)}>
                <div className="flex-1 flex flex-col overflow-y-auto px-4 space-y-2 py-4">
                    <InputGroup
                        error={errors.brand?.message as string}
                        label='Marca'
                        name="brand"
                        register={register}
                    />
                    <InputGroup
                        error={errors.model?.message as string}
                        label='Modelo'
                        name="model"
                        register={register}
                    />
                    <InputGroup
                        error={errors.km?.message as string}
                        label='Quilometragem'
                        name="km"
                        register={register}
                        type='number'
                    />
                    <InputGroup
                        error={errors.color?.message as string}
                        label='Cor'
                        name="color"
                        register={register}
                    />
                    <SelectGroup
                        error={errors.transmission?.message as string}
                        label="Câmbio"
                        name="transmission"
                        register={register}
                    />
                </div>
                <div className="flex flex-shrink-0 justify-end px-4 py-4 items-center">
                    <button className='btn bg-cyan-700' type='submit'>
                        Salvar
                    </button>
                </div>
            </form>
        </Drawer >
    )
}

export default DrawerCarForm;