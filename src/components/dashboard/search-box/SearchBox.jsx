import styles from "./search-box.module.css";
import { searchType } from '../../../utils';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SearchOptions from './search-options/SearchOptions';


function SearchBox() {
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [isValidated, setIsValidated] = useState({
		status: true,
		message: "",
	});

    const [values, setValues] = useState({
        searchTerm: "",
        searchType: "people"
    })

    function handleChange(event) {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
        setIsValidated({...isValidated, status: true});
        
        //fetch data only if a search term exists and only when target name is searchTerm, else hide dropdown menu
        if(value.trim() && name === "searchTerm") fetchData(value);
        else setShowOptions(false)
    }

    function handleSubmit(e){
        e.preventDefault();

        if (!values.searchTerm.trim()) {
            return setIsValidated({...isValidated, status: false, message: "Enter search term"});
        }
        if (!values.searchType.trim()){
            return setIsValidated({...isValidated, status: false, message: "Select a search type"})
        }

        navigate("/search-results", {state: values})
    }

    async function handleSelectOption(item) {
        setValues({...values, searchTerm: item?.name});
        setShowOptions(false);
    }

    async function fetchData(term){
        setShowOptions(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}${values.searchType}/?search=${term}`);
            if(!response.ok) return;
            const {results} = await response.json();
            setOptions(results);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className={styles.dark_background}>
            <h1 className={styles.search_text}>Find Anything <span className={styles.starwars_text}>StarWars!</span></h1>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className={styles.searchbox_container}>
                    <div className={styles.form_group_search}>
                        <label>Search Term</label>
                        <input type="text" onChange={handleChange} name="searchTerm" className={styles.input} value={values.searchTerm} placeholder="search" required />
                    </div>
                    <SearchOptions
                        showOptions={ showOptions }
                        searchTerm={values.searchTerm}
                        options={ options }
                        onClick={ handleSelectOption }
                    />
                    <div className={styles.form_group}>
                        <label>Where</label>
                        <select onChange={handleChange} name="searchType" role="combobox" className={styles.select} value={values.searchType} required>
                            {renderSearchType()}
                        </select>
                    </div>
                    {!isValidated.status && <div data-testid="warning div" className={styles.searchbox_warning}>{isValidated.message}</div>}
                    <div className={styles.form_group}>
                        <button type="submit" className={styles.button}>Search</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

function renderSearchType() {
    return searchType.map(function (item, index) {
        return <option value={item} key={index}>{item}</option>
    })
}

export default SearchBox;