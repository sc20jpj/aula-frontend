import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Button from '@components/Button/Button';
import styles from './NavBar.module.scss'; // Assuming correct path to NavBar styles

interface Link {
  label: string;
  url: string;
}

interface NavBarProps {
  links?: Link[];
}

function NavBar(props: NavBarProps) {
  const { links } = props; // Destructure logoText from props
  const navigate = useNavigate();

  const handleRedirect = (url: string) => {
    console.log("running")
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
      </div>
    </nav>
  );
}

export default NavBar;
