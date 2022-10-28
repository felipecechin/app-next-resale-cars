import { FaPencilAlt, FaTrash } from 'react-icons/fa';

import classNames from '@/utils/classNames';
import styles from './styles.module.scss';

interface TableManagementButtonsProps {
    onUpdate?: () => void;
    onDelete?: () => void;
}

function TableManagementButtons({ onUpdate = undefined, onDelete = undefined }: TableManagementButtonsProps): JSX.Element {
    return (
        <span className={styles.managementButtonsSpan}>
            {onUpdate &&
                <button
                    className={
                        classNames(styles.buttonUpdate,
                            onDelete === undefined && styles.buttonRoundedRight,
                        )
                    }
                    onClick={onUpdate}
                    type="button"
                >
                    <FaPencilAlt
                        aria-hidden="true"
                    />
                </button>
            }
            {onDelete &&
                <button
                    className={styles.buttonDelete}
                    onClick={onDelete}
                    type="button"
                >
                    <FaTrash
                        aria-hidden="true"
                    />
                </button>
            }
        </span>
    )
}

export default TableManagementButtons;