import React, { useState } from "react";
import "./App.less";
import { Route, Switch, Redirect } from "react-router-dom";
import Administration from "./routes/admin/Administration";
import routes from "./routes/routes";
import Login from "./routes/admin/Login";
import Register from "./routes/admin/Register";
import authService from "./services/authService";
import UserContext from "./context/UserContext";

function App() {
  const [auth, setAuth] = useState(authService.getCurrentUser());

  return (
    <UserContext.Provider value={{ user: auth }}>
      <Switch>
        <Route path={routes.ADMIN_LOGIN} component={Login} />
        <Route path={routes.ADMIN_REGISTER} component={Register} />
        {auth && (
          <>
            <Route path={routes.ADMIN} component={Administration} />
          </>
        )}
        <Redirect to={routes.ADMIN_LOGIN} />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
