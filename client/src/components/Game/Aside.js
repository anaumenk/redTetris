import React from "react";
import { Field, AsideInfo } from "../common";
import { Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { PIECES } from "../../constants";

const Aside = (props) => {
  const players = props.room.players;

  const playersInfo = Object.values(players).sort((a, b) => {
    return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
  }).map((player, index) => (
    <Row key={index} className="player-game-info">
      <Col sm={6}>{player.name}</Col>
      <Col sm={6}>{player.score}</Col>
    </Row>
  ));

  const nextPiece = <Field
    fieldWidth={4}
    fieldHeight={4}
    width={10}
    height={10}
    fill={[
      {
        color: props.nextPieceColor,
        place: PIECES[props.nextPieceFigure][props.nextPieceTurn]
      },
    ]}
  />;

  return (
    <div className="aside-container">
      {props.lid && <div className="buttons">
        {!props.game && <Button variant="secondary" onClick={props.startGame}>Start</Button>}
        {props.game && <Button variant="secondary" onClick={props.startGame}>Pause</Button>}
        {props.game && <Button variant="secondary" onClick={props.stopGame}>Stop</Button>}
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
  nextPieceFigure: state.game.nextPieceFigure,
  nextPieceTurn: state.game.nextPieceTurn,
  nextPieceColor: state.game.nextPieceColor,
});

export default connect(mapStateToProps)(Aside);
