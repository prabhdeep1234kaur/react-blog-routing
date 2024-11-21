import React from 'react'
import { useParams, Link } from 'react-router-dom'

const PostPage = ({posts, handleDelete}) => {
  
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id); //specific post we want to see
  
  return (
    <main className='PostPage'>
      <article className='post'>
        {post && 
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <button onClick={()=>handleDelete(post.id)}>
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