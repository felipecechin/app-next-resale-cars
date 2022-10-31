import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import MessageError from '@/components/shared/MessageError';

interface SelectGroupProps<T extends FieldValues> {
    label: string;
    error: string;
    register: UseFormRegister<T>;
    name: Path<T>;
}

function SelectGroup<T extends FieldValues>({ label, error, name, register }: SelectGroupProps<T>): JSX.Element {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text text-md font-semibold">
                    {label}
                </span>
            </label>
            <select className="select select-bordered w-full" {...register(name)}>
                <option>Automático</option>
                <option>Manual</option>
            </select>
            {error &&
                <MessageError
                    message={error}
                />
            }
        </div>
    )
}

export default SelectGroup;