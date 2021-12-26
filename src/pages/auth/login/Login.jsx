import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "./login.module.css";

export default function Login() {
    const navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const [values, setValues] = useState({
		characterName: "Luke Skywalker",
		birthYear: "19BBY",
	});
    const [error, setError] = useState({
        status: "",
        message: ""
    });
    const [warning, setWarning] = useState({
        status: "",
        message: ""
    })

    function handleChange(event){
		setValues({ ...values, [event.target.name]: event.target.value });
	};

    async function fetchData(values) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}people/?search=${values.characterName}`)
            const data = await response.json();
            let result = data.results;
            validateLoginDetails(result);
        } catch (error) {
            setError(error);
        }
    }

    function validateLoginDetails(result) {
        let invalidConditions = result.length < 1 || (result[0].name !== values.characterName && result[0].birth_year !== values.birthYear);
        
        if(invalidConditions){
            return setError({...error, status: true, message: 'Invalid details entered.'})
        }
        navigate(from, { replace: true });
    }
    
	async function handleSubmit(e) {
        e.preventDefault();
        
		if (!values.characterName.trim()) {
            return setWarning({...warning, status: true, message: "Enter Character name"});
        }
        if (!values.birthYear.trim()){
            return setWarning({...warning, status: true, message: "Enter birth year"});
        }
        fetchData(values);
        console.log(values);
	}

    return (
        <div className={styles.container}>
            <div className={styles.rows}>
                <div className={styles.column_one}>
                </div>
                <div className={styles.column_two}>
                    <h1 className={styles.login_text}>Star Wars Login</h1>
                    <form onSubmit={handleSubmit} className={styles.login_form}>
                        <div>
                            <input
                                type="text"
                                name="characterName"
                                className={styles.login_input}
                                values={values.characterName}
                                onChange={handleChange}
                                placeholder="Character Name"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="birthYear"
                                className={styles.login_input}
                                values={values.birthYear}
                                onChange={handleChange}
                                placeholder="Birth Year"
                                required
                            />
                        </div>
                        {error.status && <div className={styles.login_error}>{error.message}</div>}
                        {warning.status && <div className={styles.login_error}>{warning.message}</div>}
                        <div>
                            <button type="submit" className={styles.button}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
