import React, {useEffect, useState} from "react";
import axios from "axios";
import Nav from "./Nav";

const UpdatePost = props => {
    const [state, setState] = useState({
        title: "",
        user: "",
        content: ""
    });

    const {title, user, content} = state;

    const fetchPost = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/post/${props.match.params.id}`
            );
            setState(response.data.data);
        } catch (error) {
            if (error) {
                alert(`Error loading single post ${error}`);
            }
        }
    };

    useEffect(() => {
        fetchPost().then();
    }, [props.match.params.id]);

    const handleChange = name => event => {
        setState({...state, [name]: event.target.value});
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:3000/api/post/${props.match.params.id}`,
                {
                    title,
                    content,
                    user
                }
            );

            setState(response.data.data);
            props.history.push("/");
        } catch (error) {
            alert(error.message);
        }
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
            <Nav/>
            <h1>Update POST</h1>
            <hr/>
            {/* <h1>{JSON.stringify(post)}</h1> */}

            {showUpdateForm()}
        </div>
    );
};
export default UpdatePost;
