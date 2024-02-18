import { useNavigate } from 'react-router-dom';
import styles from '@components/ModuleBox/ModuleBox.module.scss'
import Button from '@components/Button/Button';


interface ModuleBoxProps {
    module: ModuleRequest
    onClick: () => void; // Change this to () => void for a generic function

}

function ModuleBox(props: ModuleBoxProps) {

    const {  onClick,module } = props;



    return (
        <>
            
            <div onClick={() => onClick()} className={styles.moduleBox}>
                <h1 className={styles.moduleTitle}>
                    {module.name}
                </h1>
                <h2>{module.code}</h2>


            </div>

        </>
    )
}

export default ModuleBox;
