import React, { Component } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import history from "./history/history";
import { PrivateRoute } from "./PrivateRoute";
import "./App.scss";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/Pages/Login/Login"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }
  render() {
    return (
      <BrowserRouter history={history}>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Redirect from="/" to="/login" exact />
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <PrivateRoute path="/admin" name="Home" component={DefaultLayout} />
            <PrivateRoute path="**" component={DefaultLayout} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
