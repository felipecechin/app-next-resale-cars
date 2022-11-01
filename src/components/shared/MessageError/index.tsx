interface IMessageErrorProps {
    message: string;
}

function MessageError({ message }: IMessageErrorProps): JSX.Element {
    return (
        <p className="mt-2 text-sm text-left text-red-600">
            {message}
        </p>
    )
}

export default MessageError;