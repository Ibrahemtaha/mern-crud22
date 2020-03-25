import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./Nav";
import axios from "axios";
import { Link } from "react-router-dom";

const App = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get(`http://localhost:3000/api/posts`)
      .then(response => {
        console.log(response);
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
        alert(error.response);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container py-5">
      <Nav />
      <h1>Mern Stack!!!!</h1>
      <hr />
      {/* {JSON.stringify(posts)} */}
      {posts.map((post, i) => (
        <div
          className="row"
          key={post.post_id}
          style={{ border: "1px solid silver" }}
        >
          <div className="col pt-3 pb-2">
            <Link to={`/post/${post.post_id}`}>{post.title}</Link>
            <p className="lead">{post.content.substring(0, 100)}</p>
            <p>
              Author{" "}
              <span className="badge">
                {post.user} Published on{" "}
                <span className="badge">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
