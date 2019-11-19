import { Col, Row } from "react-bootstrap";
import React from "react";

const PlayerInfo = ({ player }) => (
  <Row className="player-game-info">
    <Col sm={6}>{player.name}</Col>
    <Col sm={6}>{player.score}</Col>
  </Row>
);

export default PlayerInfo;
