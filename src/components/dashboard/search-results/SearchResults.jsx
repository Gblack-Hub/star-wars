import { useEffect, useRef, useState } from 'react';
// import SearchResultCard from './search-result-card/SearchResultCard';
import { SearchResultGraph } from './search-result-graph/SearchResultGraph';
import { SearchResultWookieGraph } from './search-result-graph/SearchResultWookieGraph';
import styles from "./search-results.module.css";

export default function SearchResults({searchValues}) {
    const [page, setPage] = useState(1)
    const [allResults, setAllResults] = useState([]);
    const [nextResults, setNextResults] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const loader = useRef(null);
    
    const handleObserver = (entities) => {
        const target = entities[0]
        if (target.isIntersecting) {
            console.log('d')
          setPage(_page => _page + 1)
        }
    }

    useEffect(() => {
        const options = {
          root: null,
          rootMargin: '20px',
          threshold: 1.0,
        }
        const observer = new IntersectionObserver(handleObserver, options)
        if (loader.current) {
          observer.observe(loader.current)
        }
    }, [])

    async function fetchResults(){
        let response;
        if(nextResults)
        setLoading(true);
        try {
            if(searchValues.encoding === "wookiee"){
                response = await fetch(`${process.env.REACT_APP_API_URL}${searchValues.searchType}/?format=wookiee`);
            } else {
                response = await fetch(`${process.env.REACT_APP_API_URL}${searchValues.searchType}/?search=${searchValues.searchTerm}&page=${page}`);
            }
            if(!response.ok){
                setError('Something went wrong while fetching...');
                setLoading(false);
                return;
            }
            console.log(response)
            const {results, next} = await response.json();
            console.log(results)
            const updatedResults = allResults?.concat(results)
            setNextResults(next);
            console.log(updatedResults);
            setAllResults(updatedResults);
            setLoading(false);
        } catch (error) {
            setLoading(false)
            setError(error.message);
        }
    }

    useEffect(function(){
        fetchResults();
        // eslint-disable-next-line
    }, [page]);

    return (
        <div>
            {loading && renderLoadingResponse()}
            {error && allResults.length === 0 && renderErrorResponse(error)}
            {allResults.length === 0 && renderNoResultsFound()}
            {renderResults(allResults, searchValues)}
            <div ref={loader} className='text-center'>
                { allResults?.length > 0 && loading && <div>Loading more...</div> }
            </div>
        </div>
    )
}

function renderResults(results, searchValues){
    return <div className={styles.search_results__container}>
        {results?.map(function(item, index) {
            if(searchValues.encoding === "wookiee")
                return <SearchResultWookieGraph result={item} searchType={searchValues.searchType} key={index} />
            else
                return <SearchResultGraph result={item} searchType={searchValues.searchType} key={index} />
            // return <SearchResultCard result={item} searchType={searchValues.searchType} key={index} />
        })}
    </div>
}

function renderNoResultsFound(){
    return <div className={styles.no_results}>No results found</div>
}

function renderLoadingResponse(){
    return <div className='text-center'>
        <div className="spinner-border primaryColor" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
}

function renderErrorResponse(error){
    return <div className={styles.error_text}>{error.message ?? "Error while fetching results..."}</div>;
}