import * as yup from 'yup';

import { SubmitHandler, useForm } from 'react-hook-form';

import Drawer from '@/components/shared/Drawer';
import InputGroup from '@/components/shared/form/InputGroup';
import MessageError from '@/components/shared/MessageError';
import { reactSwal } from '@/utils/reactSwal';
import { sweetAlertOptions } from '@/utils/sweetAlertOptions';
import { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

const carSchema = yup.object({
    brand: yup.string().required('Por favor, preencha o campo'),
    model: yup.string().required('Por favor, preencha o campo'),
    km: yup.number().required('Por favor, preencha o campo'),
    color: yup.string().required('Por favor, preencha o campo'),
    transmission: yup.string().required('Por favor, preencha o campo'),
})

type FormValues = {
    brand: string;
    model: string;
    km: number;
    color: string;
    transmission: string;
}

interface DrawerCarFormProps {
    open: boolean;
    onClose: () => void;
}

function DrawerCarForm({ open, onClose }: DrawerCarFormProps): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(carSchema)
    });

    const submitCarForm = useCallback<SubmitHandler<FormValues>>(async (data): Promise<void> => {
        console.log(data);
        return
        // reactSwal.fire({
        //     title: 'Por favor, aguarde...',
        //     allowEscapeKey: false,
        //     allowOutsideClick: false,
        // });
        // reactSwal.showLoading();
        try {
            const response = await fetch('/api/signin', { method: 'POST', body: JSON.stringify({ email, password }) })

            const json: SigninResponse = await response.json();

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
                        label='Marca'
                        {...register('brand')}
                        error={errors.brand?.message as string}
                    />
                    <InputGroup
                        label='Modelo'
                        {...register('model')}
                        error={errors.model?.message as string}
                    />
                    <InputGroup
                        label='Quilometragem'
                        {...register('km')}
                        error={errors.km?.message as string}
                        type='number'
                    />
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-md font-semibold">
                                Cor
                            </span>
                        </label>
                        <input className="input input-bordered w-full" type="text" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-md font-semibold">
                                Câmbio
                            </span>
                        </label>
                        <select className="select select-bordered w-full">
                            <option>Automático</option>
                            <option>Manual</option>
                        </select>
                    </div>
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