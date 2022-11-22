import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

import MessageError from '@/components/shared/MessageError'

interface IInputGroupProps<T extends FieldValues> {
    label: string
    error: string
    type?: string
    register: UseFormRegister<T>
    name: Path<T>
}

function InputGroup<T extends FieldValues>({
    label,
    error,
    name,
    type = 'text',
    register,
}: IInputGroupProps<T>): JSX.Element {
    return (
        <div className='form-control'>
            <label className='label'>
                <span className='label-text text-md font-semibold'>
                    {label}
                </span>
            </label>
            <input
                className='input input-bordered w-full'
                type={type}
                {...register(name)}
            />
            {error && <MessageError message={error} />}
        </div>
    )
}

export default InputGroup
