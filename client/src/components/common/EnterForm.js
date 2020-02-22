import React, { useState } from "react";
import { CentralBlock, Input } from "../common";
import { Button, Form } from "react-bootstrap";
import { configAxios } from "../../axios";
import { API, ENTER_ACTIONS, METHODS, ROUTES } from "../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from "../../actions";

const EnterForm = ({ action, history, logInAction }) => {
  const [ name, setName ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState("");

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
    switch (action) {
      case ENTER_ACTIONS.REGISTER:
        api = API.REGISTER;
        break;
      case ENTER_ACTIONS.LOGIN:
        api = API.LOGIN;
        break;
      default:
        api = "";
    }
    configAxios(METHODS.POST, api, { name, password }).then((response) => {
      const data = response.data;
      if (!data.error) {
        logInAction(data.data.token);
        history.push(ROUTES.MENU);
      } else {
        setError(data.error);
      }
    }).catch((err) => console.log(err));
  };

  return (
    <CentralBlock title={action} close={true}>
      <Form className="enter" onSubmit={onSubmit}>
        <Input title="Player name" type="text" value={name} onChange={onChange} name="name" />
        <Input title="Password" type="password" value={password} onChange={onChange} name="password" />
        {!!error && <div className="error">{error}</div>}
        <div className="buttons">
          <Button className="button" disabled={!name || !password} type="submit">{action}</Button>
        </div>
      </Form>
    </CentralBlock>
  );
};

export default withRouter(connect(null, { logInAction: logIn })(EnterForm));
