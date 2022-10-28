import { FaStepBackward, FaStepForward } from 'react-icons/fa';

import ReactPaginate from 'react-paginate';
import styles from './styles.module.scss';

interface CustomReactPaginateProps {
    actualPage: number;
    pagesNumber: number;
    onPageClick: (selectedItem: { selected: number }) => void;
}

function CustomReactPaginate({ actualPage, onPageClick, pagesNumber }: CustomReactPaginateProps): JSX.Element {
    return (
        <ReactPaginate
            activeLinkClassName={styles.activeLink}
            breakLabel="..."
            breakLinkClassName={styles.breakLink}
            containerClassName={styles.container}
            disabledLinkClassName={styles.disabledLink}
            forcePage={actualPage}
            marginPagesDisplayed={1}
            nextLabel={<FaStepForward />}
            nextLinkClassName={styles.nextLink}
            onPageChange={onPageClick}
            pageCount={pagesNumber}
            pageLinkClassName={styles.pageLink}
            pageRangeDisplayed={3}
            previousLabel={<FaStepBackward />}
            previousLinkClassName={styles.previousLink}
            renderOnZeroPageCount={() => null}
        />
    )
}

export default CustomReactPaginate;