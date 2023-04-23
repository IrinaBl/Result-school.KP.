import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import Users from "./components/layouts/users";
import EditUserPage from "./components/page/editUserPage";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/users/:userId/edit" component={EditUserPage} />
        <Route path="/users/:userId?" component={Users} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/" exact component={Main} />

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
