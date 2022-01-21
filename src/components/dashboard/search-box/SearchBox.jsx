import styles from "./search-box.module.css";
import { searchType } from '../../../utils';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function renderSearchType() {
    return searchType.map(function (item, index) {
        return <option value={item} key={index}>{item}</option>
    })
}

function SearchBox() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        searchTerm: "",
        searchType: "people"
    })
    
    function handleChange(event){
		setValues({ ...values, [event.target.name]: event.target.value });
	};

    function handleSubmit(e){
        e.preventDefault();

        if(values.searchTerm === "" || values.searchType === ""){
            return;
        }
        navigate("/search-results", {state: values})
    }

    return (
        <div className={styles.dark_background}>
            <h1 className={styles.search_text}>Find Anything <span className={styles.starwars_text}>StarWars!</span></h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.searchbox_container}>
                    <div className={styles.form_group}>
                        <label>Search Term</label>
                        <input type="text" onChange={handleChange} name="searchTerm" className={styles.input} value={values.searchTerm} placeholder="search" required />
                    </div>
                    <div className={styles.form_group}>
                        <label>Where</label>
                        <select onChange={handleChange} name="searchType" className={styles.select} value={values.searchType} required>
                            {renderSearchType()}
                        </select>
                    </div>
                    <div className={styles.form_group}>
                        <button type="submit" className={styles.button}>Search</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchBox;