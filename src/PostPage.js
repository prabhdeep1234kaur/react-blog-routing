import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import api from './api/posts';
import DataContext from './context/DataContext';


const PostPage = () => {
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id); //specific post we want to see
  

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

  return (
    <main className='PostPage'>
      <article className='post'>
        {post && 
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={'/edit/'+post.id}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button className="deleteButton" onClick={()=>handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        }
        {!post &&
          <>
            <h2>
              Post Not Found
              <Link to="/"> Visit our homepage</Link>
            </h2>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage