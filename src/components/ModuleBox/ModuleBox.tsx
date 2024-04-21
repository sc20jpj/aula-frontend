import { useNavigate } from 'react-router-dom';
import styles from '@components/ModuleBox/ModuleBox.module.scss'
import Button from '@components/Button/Button';
import PointsBox from '@components/PointsBox/PointsBox';


interface ModuleBoxProps {
    module: ModuleResponse
    onClick?: () => void; // Change this to () => void for a generic function

}

function ModuleBox(props: ModuleBoxProps) {

    const { onClick, module } = props;



    return (
        <>

            <div onClick={onClick} className={styles.moduleBox}>

                <div className={styles.header}>
                    <h1>
                        {module.name}

                    </h1>
                    
                    {module.points && module.points > 0 && (
                        <div className={styles.xpBox}>
                        <h2>XP</h2>
                        <PointsBox points={module.points} />

                        </div>
                    )}
                    
                </div>
                <hr className={styles.line}/>

                <div className={styles.content}>
                    <p>{module.code}</p>
                    <p>Taught by {module.teacher}</p>

                </div>




            </div>

        </>
    )
}

export default ModuleBox;
