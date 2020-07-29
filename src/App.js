import React from "react";
import "./App.less";
import { Route, Switch, Redirect } from "react-router-dom";
import Administration from "./routes/admin/Administration";
import routes from "./routes/routes";
import Login from "./routes/admin/Login";
import Register from "./routes/admin/Register";

function App() {
  return (
    <Switch>
      <Route path={routes.ADMIN_LOGIN} component={Login} />
      <Route path={routes.ADMIN_REGISTER} component={Register} />
      <Route path={routes.ADMIN} component={Administration} />
    </Switch>
  );
}

export default App;
