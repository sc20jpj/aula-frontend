// TextInput.tsx

import React, { useEffect, useState } from 'react';
import styles from '@components/ProfileButton/ProfileButton.module.scss'; // Import SCSS file
import { generatePath, useNavigate } from 'react-router-dom';

interface ProfileButtonProps {
    name: string;
    link?: string
    userId?: string
    large: boolean
}

function ProfileButton(props: ProfileButtonProps) {
    const { name, link, large, userId } = props;
    const [initial, setInitial] = useState<string>("")
    const navigate = useNavigate()

    const handleProfileRedirect = () => {

        
        if (userId)  {
            const path = generatePath(link!, { userId, });
            navigate(path);
        }
        else {
            const path = generatePath(link!);
            navigate(path);
        }
    }


    const createInitial = () => {


        if (name) {
            const firstLetter = name.charAt(0).toUpperCase();
            setInitial(firstLetter);
        } else {
            setInitial("");
        }
    };

    useEffect(() => {
        createInitial()
    }, [])


    return (

        <div className={styles.borderBox}>

            {large ? (
                <div className={styles.circleBoxLarge}>
                    <span>{initial}</span>
                </div>
            ) : (
                <div className={styles.circleBox} onClick={() => handleProfileRedirect()}>
                    <span>{initial}</span>
                </div>
            )}

        </div>
    );
}

export default ProfileButton;

