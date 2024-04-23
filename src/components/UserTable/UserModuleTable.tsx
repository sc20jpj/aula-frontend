import { useNavigate } from 'react-router-dom';
import styles from '@components/UserTable/UserTable.module.scss';
import Button from '@components/Button/Button';
import PointsBox from '@components/PointsBox/PointsBox';

interface UserModuleTableProps {
    users: UserModuleResponse[];
}

function UserModuleTable(props: UserModuleTableProps) {
    const { users } = props;
    var sortedUsers: UserModuleResponse[];

    sortedUsers = [...users].sort((a, b) => b.user_module.points! - a.user_module.points!);


    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>


                        <>
                            <th className={styles.blueHeader}>Position</th>
                            <th className={styles.blueHeader}>Nickname</th>
                            <th className={styles.blueHeader}>Points</th>

                        </>



                    </tr>
                </thead>
                <tbody>

                    {

                        sortedUsers.map((user, index) => (
                            
                            <tr key={index} className={index % 2 === 0 ? styles.lightBlueRow : styles.lighterBlueRow}>
                                
                                <td>{index + 1}</td>
                                <td>{user.nickname}</td>
                                <td className={styles.pointsBoxContainer}>
                                    <PointsBox
                                        points={user.user_module.points !== null? user.user_module.points  : 0 }
                                    />
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>

    );
}

export default UserModuleTable;
