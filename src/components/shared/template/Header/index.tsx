import React, { useMemo } from 'react'

import Link from 'next/link'
import _ from 'lodash'
import { menuOptions } from '@/utils/menuOptions'
import { useAuth } from '@/contexts/AuthContext'

interface IHeaderProps {
    pageTitle: string
}

function Header({ pageTitle }: IHeaderProps): JSX.Element {
    const { signout } = useAuth()

    const headerMenuOptions = useMemo(() => {
        return _.map(menuOptions, (menuOption) => {
            return (
                <li key={menuOption.key}>
                    <Link
                        className='text-gray-600 font-semibold uppercase hover:bg-cyan-700 hover:text-white'
                        href={menuOption.href}
                    >
                        {React.createElement(menuOption.icon, {
                            className: 'w-5 h-5 mr-2 sm:mr-0',
                        })}
                        <p>{menuOption.label}</p>
                    </Link>
                </li>
            )
        })
    }, [])

    return (
        <header className='w-full bg-cyan-700 px-4 py-4'>
            <div className='max-w-7xl flex flex-col mx-auto pb-32'>
                <div className='navbar rounded-lg bg-white'>
                    <div className='navbar-start w-full sm:w-1/2'>
                        <div className='dropdown'>
                            <label
                                className='btn btn-ghost lg:hidden'
                                tabIndex={0}
                            >
                                <svg
                                    className='h-5 w-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M4 6h16M4 12h8m-8 6h16'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                    />
                                </svg>
                            </label>
                            <ul
                                className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
                                tabIndex={0}
                            >
                                {headerMenuOptions}
                            </ul>
                        </div>
                        <p className='normal-case text-xl font-bold ml-1 sm:ml-4'>
                            Revenda de carros
                        </p>
                    </div>
                    <div className='navbar-center hidden lg:flex'>
                        <ul className='menu menu-horizontal p-0'>
                            {headerMenuOptions}
                        </ul>
                    </div>
                    <div className='navbar-end ml-2 sm:ml-0 w-auto sm:w-1/2'>
                        <button
                            className='link link-hover mr-2 text-cyan-700 hover:text-cyan-900'
                            onClick={signout}
                        >
                            Sair
                        </button>
                    </div>
                </div>
                <h1 className='mt-12 text-3xl font-bold text-white'>
                    {pageTitle}
                </h1>
            </div>
        </header>
    )
}

export default Header
