import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";

const SinglePost = props => {
  const [post, setPost] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/post/${props.match.params.id}`)
      .then(response => setPost(response.data))
      .catch(error => alert(`Error loading signle post ${error}`));
  }, []);
  // return <div>{JSON.stringify(props)}</div>;

  return (
    <div className="container py-5">
      <Nav />
      <h1>Mern Stack!!!!</h1>
      <hr />
      {/* <h1>{JSON.stringify(post)}</h1> */}
      <h1>{post.title}</h1>
      <p className="lead">{post.content}</p>
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
  );
};
export default SinglePost;
