import styles from "./login.module.css";
import LoginForm from '../../../components/auth/LoginForm';

export default function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.rows}>
                <div className={styles.column_one}>
                </div>
                <div className={styles.column_two}>
                    <h1 className={styles.login_text}>Star Wars Login</h1>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
