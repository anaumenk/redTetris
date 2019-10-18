import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";

const ButtonRef = ({
  history,
  location,
  match,
  staticContext,
  to,
  replace,
  ...buttonProps
}) => (
  <Button
    {...buttonProps}
    onClick={() => replace ? history.replace(to) : history.push(to)}
  />
);

export default withRouter(ButtonRef);
