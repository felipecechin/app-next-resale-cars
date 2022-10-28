import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';

import classNames from '@/utils/classNames';
import styles from './styles.module.scss';

interface TableManagementButtonsProps {
    onView?: () => void;
    onUpdate?: () => void;
    onDelete?: () => void;
}

function TableManagementButtons({ onView = undefined, onUpdate = undefined, onDelete = undefined }: TableManagementButtonsProps): JSX.Element {
    return (
        <span className={styles.managementButtonsSpan}>
            {onView &&
                <button
                    className={
                        classNames(
                            styles.buttonView,
                            onDelete === undefined && onUpdate === undefined && styles.buttonRoundedRight
                        )
                    }
                    onClick={onView}
                    type="button"
                >
                    <FaEye
                        aria-hidden="true"
                    />
                </button>
            }
            {onUpdate &&
                <button
                    className={
                        classNames(styles.buttonUpdate,
                            onDelete === undefined && styles.buttonRoundedRight,
                            onView === undefined && styles.buttonRoundedLeft
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