import { createContext, useState, useEffect } from "react";
//hooks
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({children}) =>{//refers to childrens 

    //setting states
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    //custome hook
    const {data, fetchError, isLoading} = useAxiosFetch("http://localhost:3500/posts");
    useEffect(()=>{ //adding this so that we can render our posts and it is called when the data changes
    setPosts(data);
    }, [data])

    //for api : removed because we have custom hook
    /*useEffect(()=>{
    const fetchPosts = async() => {
        try{
        const response = await api.get('/posts'); //get+endpoint
        //we dont have to define data, it creates the json
        //automatically catches the error it not in 200 response so no need to verify response data
        setPosts(response.data);
        }catch(err){
        if(err.response) {
            //not in 200 response range : following depends on what backend is sending
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        }else{
            console.log("Error "+err.message);//some response
        }
        }
    }
    fetchPosts();
    },[]);*/

    useEffect(()=>{
    const filterResults = posts.filter(post => 
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || 
        ((post.title).toLowerCase()).includes(search.toLowerCase())
        )
        setSearchResults(filterResults.reverse()); //to show recent one on top
    },[posts, search])

    return (
        <DataContext.Provider value = {{
            search, setSearch,  searchResults, fetchError, isLoading , posts, setPosts
            }} >
            {children}
        </DataContext.Provider>
    )

}

export default DataContext;