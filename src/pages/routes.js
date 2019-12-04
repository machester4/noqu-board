import React from "react";

// Libs
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Pages
import LoginPage from "./Login";
import BoardPage from "./board";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/board" component={BoardPage} exact />
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
