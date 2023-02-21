import React from "react";
import Users from "./components/users";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import UserPage from "./components/layouts/userPage";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route
          exact
          path="/users/:userId"
          render={(props) => <UserPage {...props} />}
        />
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
      </Switch>
    </div>
  );
}

export default App;
