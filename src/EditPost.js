import React from 'react';
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {format} from 'date-fns';
import { useStoreActions, useStoreState } from 'easy-peasy';

const EditPost = () => {
  const navigate = useNavigate()
  const {id} = useParams() ;//from route
  
  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);
  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);
 
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);

  //to fill in the content from the posts api
  useEffect(() => {
    if(post){
        setEditTitle(post.title);
        setEditBody(post.body);
    }
  }, [post, setEditBody, setEditTitle])

  //handling edit
  const handleEdit = (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp'); //month date, year time
    const updatedPost = {id, title: editTitle, datetime, body: editBody};
    editPost(updatedPost);
    navigate('/post/'+id);
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
            <button type="button" onClick={()=>handleEdit(post.id)}> Submit </button>
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