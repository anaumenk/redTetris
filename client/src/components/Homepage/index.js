import React from "react";
import { CentralBlock, ButtonRef } from "../";
import {ROUTES} from "../../constants";

const Homepage = () => (
  <CentralBlock title="Red tetris">
      <ButtonRef to={ROUTES.PLAYER}>Start the game</ButtonRef>
  </CentralBlock>
);

export default Homepage;
