import { FaCar, FaChartLine, FaHistory } from 'react-icons/fa'

export const menuOptions = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: FaChartLine,
        href: '/',
    },
    {
        key: 'cars',
        label: 'Carros',
        icon: FaCar,
        href: '/cars',
    },
    {
        key: 'history',
        label: 'Histórico de ações',
        icon: FaHistory,
        href: '/history',
    },
]
