import React from 'react';
import { Provider } from "react-redux";
import { Switch, Route, Redirect, HashRouter} from "react-router-dom";
import { store } from './store';
import Homepage from "./components/Homepage";
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomsList from "./components/Rooms";
import { ROUTES } from "./constants";
import Game from "./components/Game";
import Player from "./components/Player";
import { IsLogin } from "./utility";
import Enter from "./components/Enter";
import Login from "./components/Login";
import Register from "./components/Register";

const Menu = () => <h1>Menu</h1>

const App = () => (
      <Provider store={store}>
          <HashRouter>
              <Container>
                  <Switch>
                      <Route path={ROUTES.ROOT} exact={true} component={Homepage} />
                      <Route path={ROUTES.ENTER} component={Enter}/>
                      <Route path={ROUTES.LOGIN} component={Login}/>
                      <Route path={ROUTES.REGISTER} component={Register}/>
                      <IsLogin>
                        <Route path={ROUTES.MENU} component={Menu} />
                      </IsLogin>
                      {/*<Route path={ROUTES.ROOMS} component={RoomsList} />*/}
                      {/*<Route path={ROUTES.PLAYER} component={Player} />*/}
                      {/*<Route path={ROUTES.ROOM} component={Game} />*/}
                      <Redirect to={ROUTES.ROOT} />
                  </Switch>
              </Container>
          </HashRouter>
      </Provider>
);

export default App;
