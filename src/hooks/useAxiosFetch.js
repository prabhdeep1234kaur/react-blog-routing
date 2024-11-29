import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';

const useAxiosFetch = (dataUrl) => { //anonymous function
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{ //arrow function
        let isMounted = true; //because we want component to be really mounted, we keep a check as we dont want the component after it is mounted, it will be memory leak : checking status as we apply things
        const source = axios.CancelToken.source(); //cancel the request if for whatever reason the component is unmounted

        //fetchdata : definition of the funcation
        const fetchData = async (url) => {
            setIsLoading(true);
            try{
                const response = await axios.get(url, {
                    cancelToken: source.token //allows us to cancel request if we unmount the component
                });
                if (isMounted){
                    setData(response.data);
                    setFetchError(null);
                }
            }catch(err){
                if(isMounted){
                    setFetchError(err.message);
                    setData([]); //because we recieved an error
                }
            }finally{
                //isMounted && setTimeout(()=>setIsLoading(false), 2000); //if ismounted is true, set timeout for 2 seconds , uncomment it to check loading msg
                isMounted && setIsLoading(false); 
            }
        }

        fetchData(dataUrl);

        //cleanup : will cancel the request if the component gets unmounted
        const cleanUp = () => {
            //console.log("Clean up function from axios");
            isMounted = false;
            source.cancel();
        }

        return cleanUp;

    }, [dataUrl]) //dependency is dataUrl , when changes we want to have useEffect

    return {data, fetchError, isLoading}; //we are returning this
}

export default useAxiosFetch