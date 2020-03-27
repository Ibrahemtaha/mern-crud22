import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Create from "./Create";
import SinglePost from "./SinglePost";
import UpdatePost from "./UpdatePost";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/create" exact component={Create} />
        <Route path="/post/:id" exact component={SinglePost} />
        <Route path="/post/update/:id" exact component={UpdatePost} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
