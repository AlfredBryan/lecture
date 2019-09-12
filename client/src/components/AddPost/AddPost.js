import React, { Component } from "react";
import CustomNavBar from "../NavBar/CustomNavBar";
import axios from "axios";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      post: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, author, post } = this.state;
    axios
      .post("http://localhost:4000/api/v1/post/add", { title, author, post })
      .then(res => {
        if (res.status === 200) {
          this.props.history.replace("/");
        }
      });
  };

  render() {
    const { title, author, post } = this.state;
    return (
      <div>
        <CustomNavBar />
        <div className="container">
          <h2>Create new Post</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label for="email">Title</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter title"
                name="title"
                value={title}
                onChange={this.handleChange}
              />
            </div>
            <div class="form-group">
              <label for="pwd">Author</label>
              <input
                className="form-control"
                placeholder="Enter Author's Name"
                name="author"
                value={author}
                onChange={this.handleChange}
              />
            </div>
            <div class="form-group">
              <label for="pwd">Post</label>
              <textarea
                className="form-control"
                name="post"
                value={post}
                onChange={this.handleChange}
              ></textarea>
            </div>
            <button
              className="form-control btn-success"
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddPost;
