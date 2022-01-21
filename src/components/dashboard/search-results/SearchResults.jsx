import { useEffect, useRef, useState } from 'react';
import SearchResultCard from './search-result-card/SearchResultCard';
import styles from "./search-results.module.css";

export default function SearchResults({searchValues}) {
    const [page, setPage] = useState(1)
    const [results, setResults] = useState([]);
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

    useEffect(function(){
        async function fetchResults(){
            if(nextResults)
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}${searchValues.searchType}/?search=${searchValues.searchTerm}&page=${page}`);
                if(!response.ok){
                    setError('Something went wrong while fetching..');
                    setLoading(false);
                    return;
                }
                const {results, next} = await response.json();
                const updatedResults = results?.concat(results)
                setNextResults(next);
                console.log(updatedResults);
                setResults(updatedResults);
                setLoading(false);
            } catch (error) {
                setLoading(false)
                setError(error.message);
            }
        }
        fetchResults();
        // eslint-disable-next-line
    }, [page]);

    return (
        <div>
            {loading && renderLoadingResponse()}
            {error && renderErrorResponse(error)}
            <div style={{display: "flex", flexWrap: "wrap", gap: "17px"}}>
                {renderResults(results, searchValues)}
            </div>
            <div ref={loader} className='text-center'>
                { results?.length > 0 && loading && <div>Loading more...</div> }
            </div>
        </div>
    )
}

function renderResults(results, searchValues){
    return results?.map((item, index) => (
        <SearchResultCard result={item} searchType={searchValues.searchType} key={index} />
    ))
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