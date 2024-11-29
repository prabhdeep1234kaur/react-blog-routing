import React from 'react'
import Feed from './Feed'

const Home = ({posts , fetchError, isLoading}) => {
  return (
    <main className="Home">
      {
        /**
         {posts.length ? (
        <Feed posts={posts} />
      ): (
        <p style={{ marginTop: "2rem"}}>
          No posts available
        </p>
      )}
         */
      }
      {isLoading && <p className='statusMsg'>Loading Posts...</p>}
      {!isLoading && fetchError && <p className='statusMsg' style={{color: "red"}}>{fetchError}</p>}
      {!isLoading && !fetchError && (posts.length ? <Feed posts={posts} /> :<p className='statusMsg'>No posts to display</p> )}
    </main>
  )
}

export default Home