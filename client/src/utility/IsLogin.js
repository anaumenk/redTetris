import React from "react"
import { ROUTES } from "../constants";
import { Route } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import {logOut} from "./../actions"

const IsLogin = ({ children, isAuthenticated, history, goToMenu, logOutAction }) => {

    if (!isAuthenticated) {
        history.push(ROUTES.ENTER);
    }
    return (
        <Route
            render={() => (
                <>
                    <div className="logout" onClick={() => goToMenu ? history.push(ROUTES.MENU) : logOutAction()}>
                        <IoMdExit/>
                    </div>
                    {children}
                </>)
            }
        />
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, {logOutAction: logOut})(IsLogin));