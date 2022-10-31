import MessageError from '@/components/shared/MessageError';

interface InputGroupProps extends React.HTMLAttributes<HTMLInputElement> {
    label: string;
    error: string;
    type?: string;
}

function InputGroup({ label, error, type = 'text', ...rest }: InputGroupProps): JSX.Element {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text text-md font-semibold">
                    {label}
                </span>
            </label>
            <input className="input input-bordered w-full" type={type} {...rest} />
            <MessageError
                message={error}
            />
        </div>
    )
}

export default InputGroup;