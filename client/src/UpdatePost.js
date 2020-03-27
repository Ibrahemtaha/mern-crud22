import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";

const UpdatePost = props => {
  const [state, setState] = useState({
    title: "",
    user: "",
    content: ""
    // id: ""
  });
  // NOTE: I didn't add "slug" as in useSate as in the video

  const { title, user, content } = state;

  useEffect(() => {
    // we need to fetch the old value
    console.log(props);

    console.log(props.match.params.id);
    axios
      .get(`http://localhost:3000/api/post/${props.match.params.id}`)

      //.then(response => setPost(response.data[0])) // use it when we use findAll() in server side.
      .then(response => {
        console.log(response.data);
        setState(response.data);
      }) // this is f
      .catch(error => alert(`Error loading signle post ${error}`));

    // axios
    //     .put(`http://localhost:3000/api/post/${props.match.params.id}`)
    //     .then(response => {
    //         const {title, user, content} = response.data;
    //         setState({...state, title, user, content});
    //     })
    //     .catch(error => alert(`Error loading signle post ${error}`));
  }, []);
  // return <div>{JSON.stringify(props)}</div>;

  // onchange event handler
  const handleChange = name => event => {
    // console.log('name', name, 'event', event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    // we can keep the id in state and we can get it from the props.match.params.id

    axios
      .put(`http://localhost:3000/api/post/${props.match.params.id}`, {
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
        //alert(`Post titled ${title} is updated`);
        props.history.push("/");
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
          value={user}
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
          value={content}
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
