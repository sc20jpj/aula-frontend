import { useNavigate } from 'react-router-dom';
import styles from '@components/UserTable/UserTable.module.scss';
import Button from '@components/Button/Button';
import PointsBox from '@components/PointsBox/PointsBox';

interface UserTableProps {
    users: User[];

    ordered?: boolean
}

function UserTable(props: UserTableProps) {
    const { users, ordered } = props;
    var sortedUsers: User[];

    sortedUsers = [...users].sort((a, b) => b.points! - a.points!);


    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>

                        {ordered ? (
                            <>
                                <th className={styles.blueHeader}>Position</th>
                                <th className={styles.blueHeader}>Nickname</th>
                                <th className={styles.blueHeader}>Points</th>

                            </>

                        ) : (
                            <>
                                <th className={styles.blueHeader}>Name</th>
                                <th className={styles.blueHeader}>Email</th>
                                <th className={styles.blueHeader}>Nickname</th>
                            </>

                        )}

                    </tr>
                </thead>
                <tbody>

                    {ordered ? (

                        sortedUsers.map((user, index) => (
                            <tr key={index} className={index % 2 === 0 ? styles.lightBlueRow : styles.lighterBlueRow}>
                                
                                <td>{index+1}</td>
                                <td>{user.nickname}</td>
                                <td className={styles.pointsBoxContainer}>
                                    <PointsBox
                                        points={user.points}
                                    />
                                </td>
                            </tr>
                        ))

                    ) : (

                        users.map((user, index) => (
                            <tr key={index} className={index % 2 === 0 ? styles.lightBlueRow : styles.lighterBlueRow}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.nickname}</td>
                            </tr>
                        ))

                    )}

                </tbody>
            </table>
        </div>

    );
}

export default UserTable;
