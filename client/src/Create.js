import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Nav from "./Nav";

function Create({ history }) {
  //state
  const [state, setState] = useState({
    title: "",
    user: "",
    content: ""
  });
  //destructure vlaues from state (so we can use just each var in value [instead of state.value])
  const { title, user, content } = state;

  //onchange event handler
  const handleChange = name => event => {
    //console.log("name", name, "event", event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/post`, {
        title,
        user,
        content
      });

      setState({ ...state, title: "", user: "", content: "" });
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container py-5">
      <Nav />
      <br />
      <h1>Creat POST</h1>
      <br />
      {/* {JSON.stringify(state)} */}
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
            value={user}
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
            value={content}
            type="text"
            className="form-control"
            placeholder="Post Content"
            cols="20"
            rows="5"
          />
        </div>
        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}

export default Create;
