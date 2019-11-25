import React from "react";

// Libs
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";

// Pages
import LoginPage from "./Login";
import BoardPage from "./board";

function Routes() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={LoginPage} exact />
            <Route path="/board" component={BoardPage} exact />
            <Redirect from="/" to="/login" />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default Routes;
