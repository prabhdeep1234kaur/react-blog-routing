import React from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
const EditPost = ({
    posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle
}) => {
  const {id} = useParams() ;//from route
  const post = posts.find(post=>(post.id).toString() === id);
  //to fill in the content from the posts api
  useEffect(() => {
    if(post){
        setEditTitle(post.title);
        setEditBody(post.body);
    }
  }, [post, setEditBody, setEditTitle])
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