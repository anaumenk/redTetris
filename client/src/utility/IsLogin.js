import React from "react"
import { ROUTES } from "../constants";
import { Redirect, Route } from "react-router-dom";
import {auth} from "./";

const IsLogin = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={() => auth.isAuthenticated ? children : <Redirect to={ROUTES.ENTER} />}
  />
);

export default IsLogin;
