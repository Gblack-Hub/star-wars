import { Link, useNavigate } from 'react-router-dom';
import styles from "./navbar.module.css";

export default function Navbar() {
    const navigate = useNavigate();

    function handleLogout() {
        window.localStorage.removeItem("isLoggedIn");
        window.localStorage.removeItem("loggedInUserData");
        navigate("/login");
    }
    return (
        <nav className={styles.navbar} title="navbar">
            <Link to="/">
                <span className={styles.navbar__brand}>Home</span>
            </Link>
            <button className={styles.button} onClick={handleLogout}>Logout</button>
    </nav>
    )
}