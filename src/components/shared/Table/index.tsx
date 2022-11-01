import _ from 'lodash';
import dynamic from 'next/dynamic';

// eslint-disable-next-line @typescript-eslint/naming-convention
const CustomReactPaginate = dynamic(() => import('@/components/shared/CustomReactPaginate'), {
    ssr: false,
})

type THeaderObject = {
    key: string;
    label: string;
}

interface ITableProps {
    header: THeaderObject[];
    data: { [key: string]: string | number | JSX.Element }[];
    idObjectKey: string;
    totalRecords: number;
    onChangePage: (page: number) => void;
    actualPage: number;
}

function Table({ header, data, idObjectKey, totalRecords, onChangePage, actualPage }: ITableProps): JSX.Element {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            {_.map(header, (row) => {
                                return (
                                    <th
                                        key={row.key}
                                        scope="col"
                                    >
                                        {row.label}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {_.map(data, (row) => {
                            return (
                                <tr key={String(row[idObjectKey])}>
                                    {_.map(header, (headRow, cellIndex) => {
                                        if (cellIndex === 0) {
                                            return (
                                                <th
                                                    key={row[idObjectKey] + '-' + headRow.key}
                                                >
                                                    {row[headRow.key]}
                                                </th>
                                            )
                                        } else {
                                            return (
                                                <td
                                                    key={row[idObjectKey] + '-' + headRow.key}
                                                >
                                                    {row[headRow.key]}
                                                </td>
                                            )
                                        }
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className='flex items-center justify-end sm:justify-between my-2'>
                <p className='font-normal text-sm hidden sm:block'>Mostrando {data.length} de {totalRecords} registro(s).</p>
                <CustomReactPaginate
                    actualPage={actualPage - 1}
                    onPageClick={({ selected }) => onChangePage(selected + 1)}
                    pagesNumber={Math.ceil(totalRecords / 5)}
                />
            </div>
        </>
    )
}

export default Table;