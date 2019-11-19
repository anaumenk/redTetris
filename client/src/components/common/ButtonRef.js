import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";

const ButtonRef = ({ history, to, ...buttonProps }) => (
  <Button {...buttonProps} onClick={() => history.push(to)} />
);

export default withRouter(ButtonRef);
