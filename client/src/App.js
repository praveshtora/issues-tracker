import React from "react";
import "./App.css";
import KanbanView from "./components/KanbanView";
import Dashboard from "./components/Dashboard/DashboardList";
import SignIn from "./components/SignIn/SignIn";
import { Button } from "@material-ui/core";
import "./";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";
const data = require("./data.json");

const Auth = {
  isAuthenticated: () => {
    if (localStorage.getItem("userId")) {
      return true;
    }
    return false;
  },

  signout() {
    localStorage.removeItem("userId");
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  signout = () => {
    Auth.signout();
    window.location = "/signin";
  };
  render() {
    return (
      <div>
        <header>
          <h1>Issue Tracker</h1>

          <div style={{ float: "right", right: "2px" }}>
            <Button variant="contained" color="primary" onClick={this.signout}>
              Sign Out
            </Button>
          </div>
        </header>
        <Router>
          <Switch>
            <PrivateRoute path="/dashboard/:id" component={Dashboard} />
            <PrivateRoute
              path="/board/:id"
              component={() => (
                <div className="App-intro">
                  <KanbanView data={data} />
                </div>
              )}
            />
            <Route exact path="/signin" component={SignIn} />
            <Redirect exact from="/" to="/dashboard" />
          </Switch>
        </Router>
      </div>
    );
  }
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Auth.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
export default App;
