import * as yup from 'yup';

import { SubmitHandler, useForm } from 'react-hook-form';

import Drawer from '@/components/shared/Drawer';
import InputGroup from '@/components/shared/form/InputGroup';
import SelectGroup from '@/components/shared/form/SelectGroup';
import { reactSwal } from '@/utils/reactSwal';
import { sweetAlertOptions } from '@/utils/sweetAlertOptions';
import { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

const carSchema = yup.object({
    brand: yup.string().required('Por favor, preencha o campo'),
    model: yup.string().required('Por favor, preencha o campo'),
    km: yup.number().typeError('Por favor, informe um número').positive('Por favor, informe um número maior que 0').required('Por favor, preencha o campo'),
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

interface IDrawerCarFormProps {
    open: boolean;
    onClose: () => void;
}

function DrawerCarForm({ open, onClose }: IDrawerCarFormProps): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<TFormValues>({
        resolver: yupResolver(carSchema)
    });

    const submitCarForm = useCallback<SubmitHandler<TFormValues>>(async (data): Promise<void> => {
        console.log(data);
        return
        // reactSwal.fire({
        //     title: 'Por favor, aguarde...',
        //     allowEscapeKey: false,
        //     allowOutsideClick: false,
        // });
        // reactSwal.showLoading();
        try {
            const response = await fetch('/api/signin', { method: 'POST', body: JSON.stringify({ data }) })

            const json = await response.json();

            if (!json.error) {
                reactSwal.close()
                return
            }

            reactSwal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'E-mail e/ou senha inválidos',
                confirmButtonColor: sweetAlertOptions.confirmButtonColor,
            })
        } catch (e) {
            reactSwal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'Ocorreu algum erro',
                confirmButtonColor: sweetAlertOptions.confirmButtonColor,
            })
        }
    }, []);

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