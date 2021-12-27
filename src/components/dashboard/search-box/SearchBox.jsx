import styles from "./search-box.module.css";
import { searchType } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { initiateSearch, searchSelector } from "../../../store/slices/dashboard/search";
import { useState } from 'react';

function renderSearchType() {
    return searchType.map(function (item, index) {
        return <option value={item} key={index}>{item}</option>
    })
}

function SearchBox() {
    const dispatch = useDispatch();
    
    const [values, setValues] = useState({
        searchTerm: "",
        searchType: "people"
    })

    const { success, failure, error } = useSelector(searchSelector).search;
    
    function handleChange(event){
		setValues({ ...values, [event.target.name]: event.target.value });
	};

    function handleSubmit(e){
        e.preventDefault();

        console.log(values);
        if(!values.searchTerm.trim() && !values.searchType.trim()){
            return;
        }

        dispatch(initiateSearch(values));
        console.log(success, failure, error);
    }

    return (
        <div className={styles.dark_backgound}>
            <h1 className={styles.search_text}>Find Anything <span className={styles.starwars_text}>StarWars!</span></h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.searchbox_container}>
                    <div className={styles.form_group}>
                        <label>Search Term</label>
                        <input type="text" onChange={handleChange} name="searchTerm" className={styles.input} value={values.searchTerm} placeholder="search" />
                    </div>
                    <div className={styles.form_group}>
                        <label>Where</label>
                        <select onChange={handleChange} name="searchType" className={styles.select} value={values.searchType}>
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