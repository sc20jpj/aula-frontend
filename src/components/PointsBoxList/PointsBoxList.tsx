import React from 'react';
import styles from '@components/PointsBoxList/PointsBoxList.module.scss';
import PointsBox from '@components/PointsBox/PointsBox';

interface PointsBoxList {
    number: number,
    text: string
}



function PointsBoxList(props: PointsBoxList) {
    const { number, text } = props;


    return (
        <div className={styles.circleBoxGroup}>
            
                <PointsBox points={number} />
                <p> {text}</p>
        
        </div>
    );
}

export default PointsBoxList;
