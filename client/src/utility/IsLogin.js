import React, {useEffect} from "react"
import { ROUTES } from "../constants";
import { Redirect, Route } from "react-router-dom";
import { auth } from "./";
import { IoMdExit } from "react-icons/io";

const Logout = ({ children }) => (
  <>
    <div className="logout" onClick={auth.logout}><IoMdExit/></div>
    {children}
  </>
);

const IsLogin = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={() => auth.isAuthenticated ? <Logout>{children}</Logout> : <Redirect to={ROUTES.ENTER} />}
  />
);

export default IsLogin;
