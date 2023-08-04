import "./App.css";

import React, { useEffect, useState } from "react";

const fetchData = async () => {

  try {

    const response = await fetch("https://www.reddit.com/r/popular.json");

    const data = await response.json();

    return data.data.children;

  } catch (error) {

    console.error("Error fetching Reddit data:", error);

    return [];

  }

};

 

const App = () => {

  const [redditPosts, setRedditPosts] = useState([]);

 

  useEffect(() => {

    const getRedditPosts = async () => {

      const posts = await fetchData();

      setRedditPosts(posts);

    };

    getRedditPosts();

  }, []);

 

  return (

    <div className="container">

      <nav className="navbar bg-dark text-white">

  <div class="container-fluid">

    <a class="navbar-brand"><img width='150px' src="https://logosmarcas.net/wp-content/uploads/2020/11/Reddit-Emblema.png"/></a>

    <div className="me-auto bg-danger px-3 py-2"><h2>Reddit</h2> </div>

    <form className="d-flex mx-auto" role="search">

      <input style ={{width:'400px' }} className="form-control me-2" type="search" placeholder="Search..." aria-label="Search"/>

      <button class="btn btn-danger" type="submit">Search</button>

    </form>

  </div>

</nav>

     

      <h1 className="bg-danger text-white">Reddit Popular Posts</h1>

      <div className="posts-container">

        {redditPosts.length === 0 ? (

          <p>No posts to display.</p>

        ) : (

          redditPosts.map((post) => (

            <div key={post.data.id} className="post">

              <h3 style={{fontWeight:'bold'}}>{post.data.title}</h3>

              <p>Author: {post.data.author}</p>

              {post.data.thumbnail !== "self" &&

              post.data.thumbnail !== "default" &&

              post.data.thumbnail !== "" ? (

                <img src={post.data.thumbnail} alt={post.data.title} />

              ) : null}

            </div>

          ))

        )}

      </div>

    </div>

  );

};

 

export default App;