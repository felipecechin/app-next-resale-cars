import React, { useMemo } from 'react';

import Link from 'next/link';
import _ from 'lodash'
import { menuOptions } from '@/utils/menuOptions';

interface HeaderProps {
    pageTitle: string;
}

function Header({ pageTitle }: HeaderProps): JSX.Element {
    const headerMenuOptions = useMemo(() => {
        return _.map(menuOptions, (menuOption) => {
            return (
                <li key={menuOption.key}>
                    <Link
                        href={menuOption.href}
                    >
                        {React.createElement(menuOption.icon, { className: 'w-5 h-5' })}
                        {menuOption.label}
                    </Link>
                </li>
            );
        });
    }, []);

    return (
        <header className="w-full bg-gray-600 px-4 py-4">
            <div className="max-w-7xl flex flex-col mx-auto pb-32">
                <div className="navbar rounded-lg bg-white">
                    <div className="navbar-start w-full sm:w-1/2">
                        <div className="dropdown">
                            <label className="btn btn-ghost lg:hidden" tabIndex={0}>
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h8m-8 6h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                            </label>
                            <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52" tabIndex={0}>
                                {headerMenuOptions}
                            </ul>
                        </div>
                        <p className="normal-case text-xl ml-0 sm:ml-4">Revenda de carros</p>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            {headerMenuOptions}
                        </ul>
                    </div>
                    <div className="navbar-end ml-2 sm:ml-0 w-auto sm:w-1/2">
                        <a className="link link-primary link-hover mr-2">Sair</a>
                    </div>
                </div>
                <h1 className="mt-12 text-3xl font-bold text-white">
                    {pageTitle}
                </h1>
            </div>
        </header>
    )
}

export default Header;