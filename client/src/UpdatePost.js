import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";

const UpdatePost = props => {
  const [state, setState] = useState({
    title: "",
    user: "",
    content: "",
    slug: ""
  });
  // NOTE: I didn't add "slug" as in useSate as in the video

  const { title, user, content } = state;

  useEffect(() => {
    axios
      .put(`http://localhost:3000/api/post/${props.match.params.slug}`)
      .then(response => {
        const { title, user, content } = response.data;
        setState({ ...state, title, user, content });
      })
      .catch(error => alert(`Error loading signle post ${error}`));
  }, []);
  // return <div>{JSON.stringify(props)}</div>;

  // onchange event handler
  const handleChange = name => event => {
    // console.log('name', name, 'event', event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    // console.table({ title, content, user });
    axios
      .put(`${process.env.REACT_APP_API}/post/${slug}`, {
        title,
        content,
        user
      })
      .then(response => {
        console.log(response);
        const { title, user, content } = response.data;
        // empty state
        setState({ ...state, title, user, content });
        // show sucess alert
        alert(`Post titled ${title} is updated`);
      })
      .catch(error => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  };

  //showUpdateForm()
  const showUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          onChange={handleChange("title")}
          value={title}
          type="text"
          className="form-control"
          placeholder="Post title"
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">User</label>
        <input
          onChange={handleChange("user")}
          type="text"
          className="form-control"
          placeholder="User name"
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Content</label>
        <textarea
          onChange={handleChange("content")}
          type="text"
          className="form-control"
          placeholder="Post Content"
          cols="20"
          rows="5"
        />
      </div>
      <button className="btn btn-primary">Update</button>
    </form>
  );

  return (
    <div className="container py-5">
      <Nav />
      <h1>Update POST</h1>
      <hr />
      {/* <h1>{JSON.stringify(post)}</h1> */}

      {showUpdateForm()}
    </div>
  );
};
export default UpdatePost;
