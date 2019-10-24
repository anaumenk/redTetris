import React, { useState } from "react";
import { CentralBlock, Input } from "../common";
import { Button, Form } from "react-bootstrap";
import { configAxios } from "../../axios";
import { API, ENTER_ACTIONS, METHODS, ROUTES } from "../../constants";
import { auth } from "../../utility";
import { withRouter } from "react-router-dom"
import Feedback from "react-bootstrap/Feedback";

const EnterForm = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = event => {
    setError("");
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    let api;
    switch (props.action) {
      case ENTER_ACTIONS.REGISTER:
        api = API.REGISTER;
        break;
      case ENTER_ACTIONS.LOGIN:
        api = API.LOGIN;
        break;
    }
    configAxios(METHODS.POST, api, { name, password }).then((response) => {
      if (response.data.token) {
        auth.authenticate(response.data.token);
        props.history.push(ROUTES.MENU);
      } else {
        setError(response.data.error);
      }
    });
  };

  return (
    <CentralBlock title={props.action} close={true}>
      <Form className="enter" onSubmit={onSubmit}>
        <Input title="Player name" type="text" value={name} onChange={onChange} name="name" />
        <Input title="Password" type="password" value={password} onChange={onChange} name="password" />
        {!!error && <div className="error">{error}</div>}
        <div className="buttons justify-content-center">
          <Button disabled={!name || !password} type="submit">{props.action}</Button>
        </div>
      </Form>
    </CentralBlock>
  )
};

export default withRouter(EnterForm);
