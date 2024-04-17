import { useNavigate } from 'react-router-dom';
import styles from '@components/UserTable/UserTable.module.scss';
import Button from '@components/Button/Button';

interface TableProps {
    users: User[];
}

function Table(props: TableProps) {
    const { users } = props;

    return (
<div className={styles.tableContainer}>
    <table className={styles.table}>
        <thead>
            <tr>
                <th className={styles.blueHeader}>Name</th>
                <th className={styles.blueHeader}>Email</th>
                <th className={styles.blueHeader}>Nickname</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? styles.lightBlueRow : styles.lighterBlueRow}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.nickname}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

    );
}

export default Table;
