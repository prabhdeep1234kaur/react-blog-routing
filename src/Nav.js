import React from 'react';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Nav = () => {
  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.search);
  const setSearchResults = useStoreActions((actions) => actions.setSearchResults);

  useEffect(()=>{
    const filterResults = posts.filter(post => 
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || 
        ((post.title).toLowerCase()).includes(search.toLowerCase())
        )
        setSearchResults(filterResults.reverse()); //to show recent one on top
  },[posts, search, setSearchResults])

  return (
    <nav className='Nav'>
      <form className='searchForm' onSubmit={(e)=> e.preventDefault()}>
        <label htmlFor='search'>Search Posts</label>
        <input 
          id="search"
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </form>
      {/**Navigation */}
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/post'>Posts</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>
    </nav>
  )
}

export default Nav