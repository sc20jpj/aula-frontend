import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Button from '@components/Button/Button';
import styles from './NavBar.module.scss'; // Assuming correct path to NavBar styles
import ProfileButton from '@components/ProfileButton/ProfileButton';
import RoutesChoice from '@enums/Routes';

interface Link {
  label: string;
  url: string;
}

interface NavBarProps {
  links?: Link[];
  profile_name?: string
}

function NavBar(props: NavBarProps) {
  const { links,  profile_name } = props; // Destructure logoText from props
  const navigate = useNavigate();

  const handleRedirect = (url: string) => {
    navigate(url);
  };

  return (
    <nav className={styles.navBar}>
      <h1 className={styles.logo}>Aula</h1> {/* Add h1 tag for logo */}
      <div className={styles.links}>
        {links && (
          links.map((value, index) => (
            <Button key={index} className={styles.navButton} title={value.label} onClick={() => handleRedirect(value.url)} />
          ))
        )}
        { profile_name && (
          <div className={styles.profile}>
                    <ProfileButton large={false} name={profile_name} link={RoutesChoice.Profile}></ProfileButton>

          </div>

        )}
   




      </div>
    </nav>
  );
}

export default NavBar;
