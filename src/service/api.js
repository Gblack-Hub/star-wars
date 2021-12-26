import { useState, useEffect } from 'react';

const initOptions = {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }

}

function useFetch(url, options = initOptions) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(url, options);
            const json = await res.json();

            setData(json);
            setIsLoading(false);
        } catch (error) {
            setError(error);
        }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, isLoading };
}

export default useFetch;