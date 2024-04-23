import ModuleBox from '@components/ModuleBox/ModuleBox';
import { useEffect, useState } from 'react';
import { API } from '@lib/APi';
import Button from '@components/Button/Button';
import { useAppDispatch } from '@store/hooks';
import { user } from '@store/user/UserSlice';
import { useSelector } from 'react-redux';
import { useNavigate, generatePath, useParams } from 'react-router-dom';
import RoutesChoice from '@enums/Routes';
import { auth } from '@store/auth/authSlice';
import styles from '@components/UserTable/UserTable.module.scss'; // Import your component's SCSS file
import PointsBox from '@components/PointsBox/PointsBox';
import PointsBoxGroup from '@components/PointsBoxGroup/PointsBoxGroup';


function ViewClassResults() {
    const [modules, setModules] = useState<Module[]>();
    const state = useSelector(auth);
    const params = useParams()

    const [userQuizTakes, setUserQuizTakes] = useState<UserQuizTake[]>()
    const [quizTitle, setQuizTitle] = useState<string>("")

    useEffect(() => {
        getResults();
    }, []);

    const getResults = async () => {
        if (params.quizId) {
            API.getAllUserQuizTakes(params.quizId)
                .then((res) => {
                    setQuizTitle(res.title)
                    setUserQuizTakes(res.user_quiz_takes)
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    };

    return (
        <>

            <h1>{quizTitle} Results</h1>
            <h3>Below are the scores for this test</h3>
            {userQuizTakes && (
                <div className={styles.tableContainer}> {/* Apply the container style */}
                    <table className={styles.table}> {/* Apply the table style */}
                        <thead>
                            <tr>
                                <th className={styles.blueHeader}>Student</th> {/* Apply the blue header style */}
                                <th className={styles.blueHeader}>Score</th> {/* Apply the blue header style */}
                            </tr>
                        </thead>
                        <tbody>
                            {userQuizTakes.map((userQuizTake, index) => (
                                <tr key={index} className={index % 2 === 0 ? styles.lightBlueRow : styles.lighterBlueRow}> {/* Apply alternating row styles */}
                                    <td>{userQuizTake.name}</td>
                                    <td className={styles.pointsBoxContainer}>  
                                        <PointsBoxGroup 
                                        total_points={userQuizTake.total_points}
                                        total_user_points={userQuizTake.total_user_points}
                                        />

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>




            )}


        </>


    );
}

export default ViewClassResults;