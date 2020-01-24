import React from "react";
import { ButtonRef, CentralBlock } from "../common";
import { ROUTES } from "../../constants";

const Enter = () => (
  <CentralBlock title="Please login or register" close={false}>
    <div className="buttons">
      <ButtonRef className="button" to={ROUTES.LOGIN}>Login</ButtonRef>
      <ButtonRef className="button" to={ROUTES.REGISTER}>Register</ButtonRef>
    </div>
  </CentralBlock>
);

export default Enter;
