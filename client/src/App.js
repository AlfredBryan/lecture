import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import AddPost from "./components/AddPost/AddPost";
import Blog from "./components/SinglePost/Blog";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create_post" component={AddPost} />
        <Route exact path="/view_post/:id" component={Blog} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
