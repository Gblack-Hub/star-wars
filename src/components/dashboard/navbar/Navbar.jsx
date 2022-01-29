import {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import styles from "./navbar.module.css";

export default function Navbar() {
    const navigate = useNavigate();
    const [loggedOut, setLoggedOut] = useState(false);

    function handleLogout() {
        window.localStorage.removeItem("isLoggedIn");
        window.localStorage.removeItem("loggedInUserData");
        setLoggedOut(true);
        navigate("/login");
    }
    return (
        <nav className={styles.navbar} title="navbar">
            <Link to="/">
                <span className={styles.navbar__brand}>Home</span>
            </Link>
            {loggedOut && <div>Logged Out.</div>}
            <button className={styles.button} onClick={handleLogout}>Logout</button>
        </nav>
    )
}