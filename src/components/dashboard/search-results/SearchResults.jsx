import { useCallback, useEffect, useRef, useState } from 'react';
import SearchResultGraph from './search-result-graph/SearchResultGraph';
import SearchResultWookieGraph from './search-result-graph/SearchResultWookieGraph';
import styles from "./search-results.module.css";
import { requestHeaders } from '../../../utils/index';
import SwitchEncoding from './switch-encoding/SwitchEncoding';

export default function SearchResults({searchValues}) {
    const [page, setPage] = useState(1)
    const [allResults, setAllResults] = useState([]);
    // const [nextResults, setNextResults] = useState(true);
    const [encoding, setEncoding] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const loader = useRef(null);
    
    const handleObserver = (entities) => {
        const target = entities[0]
        if (target.isIntersecting) {
            console.log('observed');
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
        setLoading(true);
        
        if(encoding === "wookiee"){
            handleWookieeFetch();
        } else {
            handleJsonFetch();
        }
    }

    async function handleWookieeFetch() {
        return fetch(`${process.env.REACT_APP_API_URL}${searchValues.searchType}/?format=wookiee&search=${searchValues.searchTerm}&page=${page}`, requestHeaders).then(response => {
            if(!response.ok){
                setError('Something went wrong while fetching...');
                setLoading(false);
                return;
            }
            return response.text().then((text) => {
                text = text.replace(/whhuanan/g, '"whhuanan"')
                const {rcwochuanaoc} = JSON.parse(text);
                const updatedResults = allResults?.concat(rcwochuanaoc)
                // setNextResults(whwokao);
                setAllResults(updatedResults);
                setLoading(false);
            })
        }).catch(error => {
            setLoading(false)
            setError(error.message);
            return;
        })
    }

    async function handleJsonFetch() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}${searchValues.searchType}/?search=${searchValues.searchTerm}&page=${page}`);
            if(!response.ok){
                setError('Something went wrong while fetching...');
                setLoading(false);
                return;
            }
            const {results} = await response.json();
            const updatedResults = allResults?.concat(results)
            // setNextResults(next);
            setAllResults(updatedResults);
            setLoading(false);
        } catch (error) {
            setLoading(false)
            setError(error.message);
        }
    }

    const memoizedChangeEncoding = useCallback((val) => handleChangeEncoding(val), [])

    function handleChangeEncoding(val) {
        setEncoding(val);
        setPage(1);
        setAllResults([]);
    }

    useEffect(function(){
        fetchResults();
        // eslint-disable-next-line
    }, [page, encoding]);

    return (
        <div>
            {
                loading ? renderLoadingResponse() : 
                allResults.length === 0 ? renderNoResultsFound() :
                (error && allResults.length) === 0 ? renderErrorResponse(error) : ""
            }
            {allResults.length > 0 && <SwitchEncoding onChangeEncoding={memoizedChangeEncoding} encoding={encoding} />}
            {renderResults(allResults, searchValues, encoding)}
            <div ref={loader} className='text-center'>
                { allResults?.length > 0 && loading && <div>Loading more...</div> }
            </div>
        </div>
    )
}

function renderResults(results, searchValues, encoding){
    return <div className={styles.search_results__container}>
        {results?.map(function(item, index) {
            if(encoding === "wookiee")
                return <SearchResultWookieGraph result={item} searchType={searchValues.searchType} key={index} />
            else
                return <SearchResultGraph result={item} searchType={searchValues.searchType} key={index} />
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