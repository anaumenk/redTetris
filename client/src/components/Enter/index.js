import React from "react";
import { ButtonRef, CentralBlock } from "../common";
import { ROUTES } from "../../constants";

const Enter = () => (
  <CentralBlock title="Please login or register" close={true}>
    <div className="buttons">
      <ButtonRef to={ROUTES.LOGIN}>Login</ButtonRef>
      <ButtonRef to={ROUTES.REGISTER}>Register</ButtonRef>
    </div>
  </CentralBlock>
);

export default Enter;
