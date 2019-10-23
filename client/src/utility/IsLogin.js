import React from "react"
import { localStorageKeys, localStorageService } from "../store";
import { METHODS, ROUTES, API } from "../constants";
import { Redirect } from "react-router-dom";
import {configAxios} from "../axios";

const IsLogin = (props) => {
  const player = localStorageService.readItem(localStorageKeys.TOKEN);
  if (!player) {
    return <Redirect to={ROUTES.ENTER}/>;
  } else {
    configAxios(METHODS.POST, API.TOKEN, player).then((response) => {
      if (response.data.player) {
        return props.children
      } else {
        return <Redirect to={ROUTES.ENTER}/>
      }
    })
  }
  return null;
};

export default IsLogin;
