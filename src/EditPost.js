import React from 'react';
import { useState, useEffect , useContext} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from './api/posts';
import {format} from 'date-fns';
import DataContext from './context/DataContext';

const EditPost = () => {
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate()
  const { posts, setPosts,  } = useContext(DataContext)
  const {id} = useParams() ;//from route
  const post = posts.find(post=>(post.id).toString() === id);

  //to fill in the content from the posts api
  useEffect(() => {
    if(post){
        setEditTitle(post.title);
        setEditBody(post.body);
    }
  }, [post, setEditBody, setEditTitle])

  //handling edit
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
    <main className="NewPost">
        {editTitle && /** if edit title exists then only show the form */
        <>
        <h2>Edit post</h2>
            <form className='newPostForm' onSubmit={(e)=>e.preventDefault()} >
            <label htmlFor='postTitle'>Title</label>
            <input 
                id="postTitle"
                type="text"
                required
                value={editTitle}
                onChange={(e)=>setEditTitle(e.target.value)}
            />
            <label htmlFor='postBody'>Post</label>
            <textarea 
                id="postBody"
                required
                value={editBody}
                onChange={(e)=>setEditBody(e.target.value)}
            />
            <button type="submit" onClick={()=>handleEdit(post.id)}> Submit </button>
            </form>
        </>
        }
        {!editTitle && 
        <>
            <h2>
              Post Not Found
              <Link to="/"> Visit our homepage</Link>
            </h2>
        </>
        }
    </main>
        
  )
}

export default EditPost