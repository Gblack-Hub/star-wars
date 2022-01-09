import styles from "./search-box.module.css";
import { searchType } from '../../../utils';
import { useDispatch } from 'react-redux';
import { initiateSearch } from "../../../store/slices/dashboard/search";
import { useState, useEffect, useRef } from 'react';

function renderSearchType() {
    return searchType.map(function (item, index) {
        return <option value={item} key={index}>{item}</option>
    })
}

function SearchBox() {
    const dispatch = useDispatch();
    const loader = useRef(null);
    
    const [page, setPage] = useState(1)
    const [values, setValues] = useState({
        searchTerm: "",
        searchType: "people"
    })

    const handleObserver = (entities) => {
        const target = entities[0]
        if (target.isIntersecting) {
          setPage(_page => _page + 1)
        }
    }

    useEffect(() => {
        const options = {
          root: null,
          rootMargin: '20px',
          threshold: 1.0,
        }
        // initialize IntersectionObserver and attaching to Load More div
        const observer = new IntersectionObserver(handleObserver, options)
        if (loader.current) {
          observer.observe(loader.current)
        }
      }, [])
    
    function handleChange(event){
		setValues({ ...values, [event.target.name]: event.target.value });
	};

    function handleSubmit(e){
        e.preventDefault();

        if(values.searchTerm === "" || values.searchType === ""){
            return;
        }

        dispatch(initiateSearch(values, page));
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