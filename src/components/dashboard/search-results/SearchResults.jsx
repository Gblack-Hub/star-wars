import styles from "./search-results.module.css";
import SearchResultCard from './search-result-card/SearchResultCard';
import { useSelector } from 'react-redux';
import { searchSelector } from '../../../store/slices/dashboard/search';

function SearchResults() {
    // const dispatch = useDispatch();
    const { searchResults, loading, success, failure, error } = useSelector(searchSelector).search;

    if(failure) return <div className={styles.error_text}>ERROR: {error}</div>;
    if(loading) return <div className={styles.feedback_text}>Loading...</div>
    if(success && searchResults.length < 1) return <div className={styles.not_found_text}>No result found</div>

    return (
        <div className={styles.search_result}>
            {searchResults?.map((item, index) => (
                <SearchResultCard result={item} key={index} />
            ))}
        </div>
    )
}

export default SearchResults;