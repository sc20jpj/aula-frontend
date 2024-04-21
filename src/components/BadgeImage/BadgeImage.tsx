// TextInput.tsx

import React from 'react';
import styles from '@components/BadgeImage/BadgeImage.module.scss'; // Import SCSS file

interface BadgeImageProps {
    s3_url?: string;
}

function BadgeImage(props: BadgeImageProps) {
    const { s3_url } = props;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
    };

    return (

        s3_url && (
            
            <div className={styles.BadgeImage}>
                <img
                    src={s3_url}
                    className={styles.image}
                />


            </div>
        )



    );
}

export default BadgeImage;

