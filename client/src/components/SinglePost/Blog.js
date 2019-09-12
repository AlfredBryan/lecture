import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import "./Blog.css";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id: this.props.match.params.id,
      post: "",
      comments: [],
      comment: ""
    };
  }

  postComment = e => {
    e.preventDefault();
    const { post_id, comment } = this.state;
    axios
      .post(`http://localhost:4000/api/v1/post/${post_id}/comment`, { comment })
      .then(res => {
        if (res.status === 200) {
          this.fetchPost();
        }
      })
      .catch(error => {
        throw error;
      });
  };

  fetchPost = () => {
    const { post_id } = this.state;
    axios.get(`http://localhost:4000/api/v1/post/${post_id}`).then(res => {
      console.log(res);
      if (res.status === 201) {
        this.setState({
          post: res.data,
          comments: res.data.comments
        });
      }
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.fetchPost();
  }
  render() {
    const { post, comments } = this.state;
    return (
      <div className="container">
        <div className="main-comment">
          <div className="detailBox">
            <div className="titleBox">
              <label>{post.title}</label>
              <button type="button" className="close" aria-hidden="true">
                {post.author}
              </button>
            </div>
            <div className="commentBox">
              <p className="taskDescription">{post.post}</p>
            </div>
            <div className="actionBox">
              <div id="commentsystem">
                <div id="profpicture">
                  <iframe
                    src="https://www.facebook.com/plugins/feedback.php?api_key=113869198637480&href=codepen.io&numposts=5&sdk=joey&version=v2.10&width=500"
                    frameBorder="0"
                    allowtransparency="true"
                    className="facebook"
                  />
                </div>
                <form>
                  <textarea
                    minlenght="10"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    id="comment"
                    name="comment"
                    ref="comment"
                    rows="1"
                    placeholder="Write a comment..."
                    value={this.state.comment}
                    onChange={this.handleChange}
                  />
                  <div id="logintopost">
                    <div id="loginbtn">
                      <span className="fa-stack" style={{ fontSize: "16px" }}>
                        <i className="fa fa-circle-thin fa-stack-2x fa-inverse" />
                        <i className="fa fa-facebook fa-stack-1x fa-inverse" />
                      </span>
                    </div>
                  </div>
                  <div className="switch switch-facebook">
                    <input
                      id="fb-toggle"
                      className="switch-control"
                      type="checkbox"
                    />
                    <label className="switch-toggle" htmlFor="fb-toggle">
                      <div className="switch-handle">
                        <span>
                          <i className="fa fa-facebook" />
                        </span>
                      </div>
                    </label>
                  </div>
                  <span id="alsopost">Also post on Facebook</span>
                  <span id="count" />
                  <button id="send" type="submit" onClick={this.postComment}>
                    <i style={{ fontize: "18px" }} /> POST
                  </button>
                </form>
                {comments &&
                  comments.map(comment => (
                    <ul id="commenttext" key={comment._id}>
                      <li id="commentbubble">
                        <div className="comment-style" />
                        <div id="commentwrap">
                          <div id="commentself">
                            <p id="messenger-bulle">
                              {comment.comment}
                              <span id="bullemeta">
                                {moment(comment.date).format(
                                  "dddd, MMMM Do YYYY, h:mm:ss a"
                                )}
                              </span>
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
