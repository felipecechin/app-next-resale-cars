function Header(): JSX.Element {
    return (
        <header className="w-full bg-gray-600 px-4 py-4">
            <div className="max-w-7xl navbar rounded-lg bg-white mx-auto">
                <div className="navbar-start w-full sm:w-1/2">
                    <div className="dropdown">
                        <label className="btn btn-ghost lg:hidden" tabIndex={0}>
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h8m-8 6h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                        </label>
                        <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52" tabIndex={0}>
                            <li><a>Dashboard</a></li>
                            <li><a>Carros</a></li>
                            <li><a>Histórico de ações</a></li>
                        </ul>
                    </div>
                    <p className="normal-case text-xl ml-4">Revenda de carros</p>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <li><a>Dashboard</a></li>
                        <li><a>Carros</a></li>
                        <li><a>Histórico de ações</a></li>
                    </ul>
                </div>
                <div className="navbar-end ml-2 sm:ml-0 w-auto sm:w-1/2">
                    <a className="link link-primary link-hover mr-2">Sair</a>
                </div>
            </div>
        </header>
    )
}

export default Header;