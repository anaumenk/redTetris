import React from "react";
import { Field, AsideInfo } from "../common";
import { Button, Col, Row } from "react-bootstrap";
import {PIECES} from "../../constants";
import {connect} from "react-redux";

const Aside = (props) => {
  const players = props.room.players;

  const playersInfo = Object.values(players).sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  }).map((player, index) => (
    <Row key={index} className="player-game-info">
      <Col sm={6}>{player.name}</Col>
      <Col sm={6}>{player.score}</Col>
    </Row>
  ));

  const nextPiece = <Field
    fieldWidth={4}
    fieldHeight={4}
    size={10}
    fill={[
      {
        color: "black",
        place: PIECES.T[0]
      },
    ]}
  />;

  return (
    <div className="aside-container">
      {props.lid && <div className="buttons">
        <Button variant="secondary">Start/Pause</Button>
        <Button variant="secondary">Stop</Button>
        <Button variant="secondary">Restart</Button>
      </div>}
      <AsideInfo
        title={["Next piece"]}
        info={nextPiece}
      />
      <AsideInfo
        title={["Players", "Score"]}
        info={playersInfo}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  room: state.rooms.room,
  lid: state.rooms.lid,
});

export default connect(mapStateToProps)(Aside);
