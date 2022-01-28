import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginSelector } from '../../../store/slices/auth/login';
import styles from "./login-form.module.css";

export default function LoginForm() {
    const navigate = useNavigate();
    let location = useLocation();
    const dispatch = useDispatch();

    let from = location.state?.from?.pathname || "/";

    const { success, failure, error } = useSelector(loginSelector).login;

    const [values, setValues] = useState({
		characterName: "Luke Skywalker",
		birthYear: "19BBY",
	});

    const [isValidated, setIsValidated] = useState({
		status: true,
		message: "",
	});

    function handleChange(event){
		setValues({ ...values, [event.target.name]: event.target.value });
	};
    
	async function handleSubmit(e) {
        e.preventDefault();

		if (!values.characterName.trim()) {
            return setIsValidated({...isValidated, status: false, message: "Enter Character name"});
        }
        if (!values.birthYear.trim()){
            return setIsValidated({...isValidated, status: false, message: "Enter birth year"})
        }

        await dispatch(login(values));
	}

    function redirectUser() {
        if(success)
            navigate(from, { replace: true });
    }
    
    useEffect(function(){
        redirectUser();
    })

    return (
        <form onSubmit={handleSubmit} className={styles.login_form}>
            <div>
                <input
                    type="text"
                    name="characterName"
                    className={styles.login_input}
                    value={values.characterName}
                    onChange={handleChange}
                    placeholder="Character Name"
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    name="birthYear"
                    className={styles.login_select}
                    value={values.birthYear}
                    onChange={handleChange}
                    placeholder="Birth Year"
                    required
                />
            </div>
            {failure && <div className={styles.login_error}>{error.message ?? "Login error. Please check your internet connection."}</div>}
            {!isValidated.status && <div data-testid="warning div" className={styles.login_warning}>{isValidated.message}</div>}
            <div>
                <button type="submit" className={styles.button}>Submit</button>
            </div>
        </form>
    )
}