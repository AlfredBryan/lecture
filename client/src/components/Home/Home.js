import React, { Component } from "react";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Home.css";
import CustomNavBar from "../NavBar/CustomNavBar";
import Spinner from "../hoc/Spinner";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      isOpen: false,
      loading: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  componentDidMount() {
    this.setState({
      loading: true
    });
    axios.get("http://localhost:4000/api/v1/posts").then(res => {
      if (res.status === 201) {
        this.setState({
          post: res.data.data,
          loading: false
        });
      }
    });
  }
  render() {
    const { post, loading } = this.state;
    return (
      <div className="main_header">
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <CustomNavBar />
            <div className="container-fluid">
              <div className="row">
                {post.map(blog => (
                  <Link
                    to={`/view_post/${blog._id}`}
                    key={blog._id}
                    className="col-md-4 card-body"
                  >
                    <div className=" card-title">{blog.title}</div>
                    <div className=" card-text">{blog.author}</div>
                    <div className=" card-text">{blog.post}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
