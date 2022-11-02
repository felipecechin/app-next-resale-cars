import { IconType } from 'react-icons/lib';
import React from 'react';

interface ICardNumberProps {
    icon: IconType;
    quantity: number;
    label: string;
}

function CardNumber({ icon, quantity, label }: ICardNumberProps): JSX.Element {
    return (
        <div className="bg-white rounded-lg shadow-lg flex flex-col py-4 px-4">
            <div className='flex items-center'>
                <span className='p-4 rounded-lg border border-cyan-700 bg-gray-100 mr-2'>
                    {React.createElement(icon, { className: 'w-6 h-6 text-cyan-700' })}
                </span>
                <span className='text-4xl text-gray-600 font-bold mr-2'>
                    {quantity}
                </span>
                <p className='text-lg text-gray-600 font-semibold'>
                    {label}
                </p>
            </div>
        </div>
    )
}

export default CardNumber;