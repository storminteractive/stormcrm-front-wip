import { useEffect, useState } from 'react'
import Axhelper from './Axhelper'

export function useGet(url) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            //console.log("# useGet -> getting data from: ", url)
            setLoading(true);
            const response = await Axhelper.sendGetAsync(url);
            if(response.error) {
                setError(response.error);
                setLoading(false);
                return;
            } else {
                setError(null);
                setData(response.data);
                setLoading(false);    
            }
        }
        fetchData();
    }, [url]);

    return { data, loading, error };
}