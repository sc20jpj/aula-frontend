import React from 'react';
import styles from '@components/PointsBoxGroup/PointsBoxGroup.module.scss';
import PointsBox from '@components/PointsBox/PointsBox';

interface PointsBoxGroup {
    total_points: number,
    total_user_points: number
}



function PointsBoxGroup(props: PointsBoxGroup) {
    const { total_points, total_user_points } = props;


    return (
        <div className={styles.circleBoxGroup}>
            <PointsBox points={total_user_points} />/
            <PointsBox points={total_points} />
        </div>
    );
}

export default PointsBoxGroup;
