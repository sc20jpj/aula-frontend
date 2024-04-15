import React from 'react';
import styles from '@components/PointsBox/PointsBox.module.scss';

interface PointsBoxProps {
    points?: number;

}

function PointsBox(props: PointsBoxProps) {
    const { points } = props;


    return (
        <div className={styles.circleBox}>
            <span>{points}</span>
        </div>
    );
}

export default PointsBox;
