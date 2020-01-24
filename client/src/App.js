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
import { getRooms } from "./actions"

const App = ({ getRooms }) => {
    useEffect(() => {
        getRooms();
    }, []);

    return (
      <HashRouter>
          <Container>
              <Switch>
                  <Route path={ROUTES.ROOT} exact={true} component={Homepage} />
                  <Route path={ROUTES.ENTER} component={Enter}/>
                  <Route path={ROUTES.LOGIN}><EnterForm action={ENTER_ACTIONS.LOGIN}/></Route>
                  <Route path={ROUTES.REGISTER}><EnterForm action={ENTER_ACTIONS.REGISTER}/></Route>
                  <IsLogin path={ROUTES.MENU}><Menu /></IsLogin>
                  <IsLogin path={ROUTES.ROOMS}><RoomsList /></IsLogin>
                  <IsLogin path={ROUTES.PLAYER}><Player /></IsLogin>
                  <IsLogin goToMenu={true} path={ROUTES.ROOM}><Game /></IsLogin>
                  <Redirect to={ROUTES.ROOT} />
              </Switch>
          </Container>
      </HashRouter>
    );
};

export default connect(null, { getRooms })(App);
