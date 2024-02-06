import { Link } from 'react-router-dom';
import styles from './navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/book-room" className={styles.navLink}>
            Book Room
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
