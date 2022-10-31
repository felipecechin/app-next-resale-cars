import * as yup from 'yup';

import { SubmitHandler, useForm } from 'react-hook-form';

import Drawer from '@/components/shared/Drawer';
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
            <form className='space-y-3' onSubmit={handleSubmit(submitCarForm)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-md font-semibold">
                            Marca
                        </span>
                    </label>
                    <input className="input input-bordered w-full" type="text" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-md font-semibold">
                            Modelo
                        </span>
                    </label>
                    <input className="input input-bordered w-full" type="text" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-md font-semibold">
                            Quilometragem
                        </span>
                    </label>
                    <input className="input input-bordered w-full" type="number" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-md font-semibold">
                            Cor
                        </span>
                    </label>
                    <input className="input input-bordered w-full" type="text" />
                </div>
            </form>
        </Drawer>
    )
}

export default DrawerCarForm;