import { useEffect, useRef, useState } from 'react';
import SearchResultCard from './search-result-card/SearchResultCard';
import { SearchResultGraph } from './search-result-graph/SearchResultGraph';
import styles from "./search-results.module.css";

export default function SearchResults({searchValues}) {
    const [page, setPage] = useState(1)
    const [allResults, setAllResults] = useState([]);
    const [nextResults, setNextResults] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [encoding, setEncoding] = useState("json");
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

    function handleChangeEncoding(e) {
        setEncoding(e.target.value);
        console.log(encoding);
        fetchResults();
    }

    async function fetchResults(){
        if(nextResults)
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}${searchValues.searchType}/?search=${searchValues.searchTerm}&page=${page}${encoding === "wookiee" ? "/?format=wookiee" : ""}`);
            if(!response.ok){
                setError('Something went wrong while fetching..');
                setLoading(false);
                return;
            }
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
            {error && renderErrorResponse(error)}
            {allResults.length === 0 && renderNoResultsFound()}

                <div className={styles.encoding}>
                    <label>
                        <input type="radio" value="json" name="encoding" checked={encoding === "json"} onChange={handleChangeEncoding} /> JSON
                    </label>
                    <label>
                        <input type="radio" value="wookiee" name="encoding" checked={encoding === "wookiee"} onChange={handleChangeEncoding} /> Wookie
                    </label>
                </div>
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