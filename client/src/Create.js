import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function Create() {
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
    setState({ ...state, [name]: event.target.vlaue });
  };

  return (
    <div className="container p-5">
      <h1>Creat POST</h1>
      <br />
      {/* {JSON.stringify(state)} */}
      <form>
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
        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}

export default Create;
