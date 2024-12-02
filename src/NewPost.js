import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api/posts';
import {format} from 'date-fns';
import DataContext from './context/DataContext';

export const NewPost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();

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
  return (
   
    <main className="NewPost">
      <h2>New post</h2>
        <form className='newPostForm' onSubmit={handleSubmit} >
          <label htmlFor='postTitle'>Title</label>
          <input 
            id="postTitle"
            type="text"
            required
            value={postTitle}
            onChange={(e)=>setPostTitle(e.target.value)}
          />
          <label htmlFor='postBody'>Post</label>
          <textarea 
            id="postBody"
            required
            value={postBody}
            onChange={(e)=>setPostBody(e.target.value)}
          />
          <button type="submit"> Submit </button>
        </form>
    </main>
  )
}

export default NewPost