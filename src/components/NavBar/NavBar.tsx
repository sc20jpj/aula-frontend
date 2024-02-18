import { Link } from 'react-router-dom';
import styles from '@components/NavBar/Navbar.module.scss';

interface NavBarProps {
    links: AppLinks[];
}

function NavBar(props: NavBarProps) {
    const { links } = props;

    return (
        <nav className={styles.navBar}>

            <div className={styles.links}>
                {links && (
                    links.map((value, index) => (
                        <Link className={styles.link} key={index} to={value.url}>{value.label}</Link>
                    ))
                )}
            </div>
        </nav>
    );
}

export default NavBar;
