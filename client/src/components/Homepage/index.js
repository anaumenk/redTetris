import React from "react";
import { ButtonRef, CentralBlock } from "../";
import { ROUTES } from "../../constants";

const Homepage = () => (
  <CentralBlock title="Red tetris">
      <div>
        <ButtonRef className="button" to={ROUTES.MENU}>Start the game</ButtonRef>
      </div>
  </CentralBlock>
);

export default Homepage;
