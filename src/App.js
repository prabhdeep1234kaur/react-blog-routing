//header, nav and footer they stay on the page
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
//elements that will change
import Home  from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPost from './EditPost';
//hooks
import { Route, Routes, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'; //hooks
import {format} from 'date-fns';
//api work
import api from './api/posts';


function App() {
  //setting states
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();

  //for api
  useEffect(()=>{
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
  },[]);

  useEffect(()=>{
    const filterResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || 
      ((post.title).toLowerCase()).includes(search.toLowerCase())
      )
      setSearchResults(filterResults.reverse()); //to show recent one on top
  },[posts, search])


  const handleDelete = async (id) => {
   
    try{
      await api.delete('/posts/'+id);
      const postList = posts.filter(post=>post.id !== id); //filter the post with id we have
      setPosts(postList);
      navigate('/'); //takes us back to homepage
    }catch(err){
     
      console.log("Error "+err.message);
    }
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length 
              ? posts[posts.length-1].id + 1 
              : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp'); //month date, year time
    const newPost = {id, title: postTitle, datetime, body: postBody};
    try{
      const response = await api.post('/posts', newPost);
      const allPost = [...posts, response.data];
      setPosts(allPost);
      setPostBody('');
      setPostTitle('');
      navigate('/');
    }catch(err){
      console.log("Error "+err.message);
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp'); //month date, year time
    const updatedPost = {id, title: editTitle, datetime, body: editBody};
    try{
      const response  = await api.put('/posts/'+id, updatedPost);
      setPosts(posts.map(post => post.id === id 
                        ? {...response.data}
                        : post));
      setEditBody('');
      setEditTitle('');
      navigate('/');
    }catch(err){
      console.log("Error "+err.message);
    }
  }

  return (
    <div className='App'>
      <Header title='React JS Blog' />
      <Nav search={search} setSearch={setSearch}/>
      <Routes>
        {/* Correct route definitions */}
        <Route exact path="/" element={<Home posts={searchResults} />} />
        <Route path="/post" element={<NewPost 
          handleSubmit={handleSubmit} 
          postTitle={postTitle} 
          postBody={postBody} 
          setPostBody={setPostBody}
          setPostTitle={setPostTitle} />} />
        <Route path="/edit/:id" element={<EditPost 
          posts = {posts}
          handleEdit={handleEdit} 
          editTitle={editTitle} 
          editBody={editBody} 
          setEditBody={setEditBody}
          setEditTitle={setEditTitle} />} />
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
