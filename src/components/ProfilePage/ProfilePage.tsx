import React from 'react';
import PointsBox from '@components/PointsBox/PointsBox';
import BadgeImage from '@components/BadgeImage/BadgeImage';
import AccordionContainer from '@components/AccordionContainer/AccodionContainer';
import styles from "@components/ProfilePage/ProfilePage.module.scss"
import ProfileButton from '@components/ProfileButton/ProfileButton';
interface ProfilePage {
    user: User
    badges: Badge[],
}

function ProfilePage(props: ProfilePage) {
    const { badges, user } = props;

    return (
        <div >
            <ProfileButton name={user.nickname} large={true}></ProfileButton>
            <hr />
            <h1>{user.nickname}</h1>

            <h3>{user.name}</h3>


            <div className={styles.xpBox}>
                <h2>Total XP: </h2>
                <PointsBox points={user.points} />
            </div>

            {badges ? (
                <>
                    <h2>Badges</h2>


                    <AccordionContainer title='Badges'>
                        <div className={styles.imageGroup}>
                            {badges.map((badge, key) => (
                                <div className={styles.badgeContainer} key={key}>
                                    <BadgeImage s3_url={badge.file.s3_url} />
                                    <div className={styles.badgeContent}>
                                        <h2>{badge.name}</h2>
                                        <p>{badge.description}</p>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </AccordionContainer>


                </>

            ) : (
                <p>No badges</p>
            )}



        </div>
    );
}

export default ProfilePage;
