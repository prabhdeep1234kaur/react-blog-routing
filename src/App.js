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

import { Route, Routes, useHistory } from "react-router-dom";
import {useState, useEffect} from 'react'; //hooks

function App() {
  return (
    <div className='App'>
      <Header />
      <Nav />
      <Routes>
        {/* Correct route definitions */}
        <Route exact path="/" element={<Home />} />
        <Route path="/post" element={<NewPost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
