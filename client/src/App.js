import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Switch, Route, Redirect, HashRouter} from "react-router-dom";
import Homepage from "./components/Homepage";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomsList from "./components/Rooms";
import { ENTER_ACTIONS, ROUTES } from "./constants";
import Game from "./components/Game";
import Player from "./components/Player";
import { IsLogin } from "./utility";
import Enter from "./components/Enter";
import { EnterForm } from "./components/common";
import Menu from "./components/Menu";
import { getRooms, checkAuthentication } from "./actions"

const App = ({ getRooms, checkAuthenticationAction }) => {
    useEffect(() => {
        getRooms();
        checkAuthenticationAction();
    }, []);

    return (
      <HashRouter>
          <Container>
              <Switch>
                  <Route path={ROUTES.ROOT} exact={true} component={Homepage} />
                  <Route path={ROUTES.ENTER} exact={true} component={Enter}/>
                  <Route path={ROUTES.LOGIN} exact={true} component={() => <EnterForm action={ENTER_ACTIONS.LOGIN}/>}/>
                  <Route path={ROUTES.REGISTER} exact={true} component={() => <EnterForm action={ENTER_ACTIONS.REGISTER}/>}/>
                  <IsLogin path={ROUTES.MENU} exact={true}><Menu/></IsLogin>
                  <IsLogin path={ROUTES.ROOMS} exact={true}><RoomsList/></IsLogin>
                  <IsLogin path={ROUTES.PLAYER} exact={true}><Player/></IsLogin>
                  <IsLogin goToMenu={true} path={ROUTES.ROOM}><Game/></IsLogin>
                  <Redirect to={ROUTES.ROOT} />
              </Switch>
          </Container>
      </HashRouter>
    );
};

export default connect(null, { getRooms, checkAuthenticationAction: checkAuthentication })(App);
