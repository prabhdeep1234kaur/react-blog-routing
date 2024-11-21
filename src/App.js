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

import { Route, Routes, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'; //hooks
import {format} from 'date-fns';

function App() {
  //setting states
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const filterResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || 
      ((post.title).toLowerCase()).includes(search.toLowerCase())
      )
      setSearchResults(filterResults.reverse()); //to show recent one on top
  },[posts, search])


  const handleDelete = (id) => {
    const postList = posts.filter(post=>post.id !== id); //filter the post with id we have
    setPosts(postList);
    navigate('/'); //takes us back to homepage
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length 
              ? posts[posts.length-1].id + 1 
              : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp'); //month date, year time
    const newPost = {id, title: postTitle, datetime, body: postBody};
    const allPost = [...posts, newPost];
    setPosts(allPost);
    setPostBody('');
    setPostTitle('');
    navigate('/');

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
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
