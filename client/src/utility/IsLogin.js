import React from "react"
import { ROUTES } from "../constants";
import { Redirect, Route } from "react-router-dom";
import { auth } from "./";
import { IoMdExit } from "react-icons/io";
import { withRouter } from "react-router-dom";

const Logout = ({ children, goToMenu, history }) => (
  <>
    <div className="logout" onClick={goToMenu ? () => history.push(ROUTES.MENU) : auth.logout}><IoMdExit/></div>
    {children}
  </>
);

const IsLogin = ({ children, goToMenu, history, ...rest }) => (
  <Route
    {...rest}
    render={() => auth.isAuthenticated
      ? <Logout goToMenu={goToMenu} history={history}>{children}</Logout>
      : <Redirect to={ROUTES.ENTER} />
    }
  />
);

export default withRouter(IsLogin);
