import React from 'react';
import { Provider } from "react-redux";
import { Switch, Route, Redirect, HashRouter} from "react-router-dom";
import { store } from './store';
import Homepage from "./components/Homepage";
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomsList from "./components/Rooms";
import {ENTER_ACTIONS, ROUTES} from "./constants";
import Game from "./components/Game";
import Player from "./components/Player";
import { IsLogin } from "./utility";
import Enter from "./components/Enter";
import { EnterForm } from "./components/common";
import Menu from "./components/Menu";

const App = () => (
      <Provider store={store}>
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
                      <IsLogin path={ROUTES.ROOM}><Game /></IsLogin>
                      <Redirect to={ROUTES.ROOT} />
                  </Switch>
              </Container>
          </HashRouter>
      </Provider>
);

export default App;
