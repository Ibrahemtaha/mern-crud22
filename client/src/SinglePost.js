import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";

const SinglePost = props => {
  const [post, setPost] = useState("");
  //const {match: {params: id}} = props;

  const fetchPost = async () => {
    // console.log(props.match.params.id);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/post/${props.match.params.id}`
      );
      //console.log(response);
      setPost(response.data.data);
    } catch (error) {
      alert(`Error loading single post ${error}`);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [props.match.params.id]);

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
