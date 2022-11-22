interface ICardContentProps {
    title: string
    children: React.ReactNode
}

function CardContent({ title, children }: ICardContentProps): JSX.Element {
    return (
        <div className='bg-white rounded-lg shadow-lg flex flex-col py-4 px-4'>
            <h2 className='text-cyan-700 font-bold text-xl my-2'>{title}</h2>
            {children}
        </div>
    )
}

export default CardContent
