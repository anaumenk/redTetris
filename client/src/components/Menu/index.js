import React from "react";
import { ButtonRef, CentralBlock } from "../common";
import { ROUTES } from "../../constants";

const Menu = () => (
  <CentralBlock title="Menu">
    <div className="buttons">
      <ButtonRef className="button" to={ROUTES.ROOMS}>Rooms list</ButtonRef>
      <ButtonRef className="button" to={ROUTES.PLAYER}>Player info</ButtonRef>
    </div>
  </CentralBlock>
);

export default Menu;
