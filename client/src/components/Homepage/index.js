import React from "react";
import { CentralBlock, ButtonRef } from "../";
import { ROUTES } from "../../constants";

const Homepage = () => (
  <CentralBlock title="Red tetris">
      <div className="buttons">
      <ButtonRef to={ROUTES.MENU}>Start the game</ButtonRef>
    </div>
  </CentralBlock>
);

export default Homepage;
