import SearchResults from "../../components/dashboard/search-results/SearchResults";
import { useLocation } from 'react-router-dom';
import styles from "./search-results-page.module.css";

export default function SearchResultsPage(){
    const {state} = useLocation()

    return (
        <main className={styles.page}>
            <h1 className={styles.title}>Search Results ({state?.searchTerm})</h1>
            <SearchResults searchValues={state} />
        </main>
    )
}