import SearchResults from "../../components/dashboard/search-results/SearchResults";
import { useLocation } from 'react-router-dom';
import styles from "./search-results-page.module.css";
import Navbar from '../../components/dashboard/navbar/Navbar';

export default function SearchResultsPage(){
    const {state} = useLocation()

    return (
        <>
            <Navbar />
            <main className={styles.page}>
                <h1 className={styles.title}>Search Results ({state?.searchTerm})</h1>
                <SearchResults searchValues={state} />
            </main>
        </>
    )
}