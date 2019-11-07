import React from "react";
import { Field, AsideInfo } from "../common";
import { Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { PIECES } from "../../constants";
import { movePieceDown } from "../../utility/piece";
import { setNextPiece } from "../../actions/game";

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
        color: "black",
        place: PIECES[props.nextPieceFigure][props.nextPieceTurn]
    },
    ]}
  />;

  const startGame = () => {
    props.setGame(!props.game);
    const piece = PIECES[props.nextPieceFigure][props.nextPieceTurn];
    props.movePiece(piece);
    setInterval(() => movePieceDown(piece, props.movePiece), 1000);
    props.setNextPiece();
  };

  return (
    <div className="aside-container">
      {props.lid && <div className="buttons">
        {!props.game && <Button variant="secondary" onClick={startGame}>Start</Button>}
        {props.game && <Button variant="secondary">Pause</Button>}
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
  nextPieceFigure: state.game.nextPieceFigure,
  nextPieceTurn: state.game.nextPieceTurn,
});

export default connect(mapStateToProps, { setNextPiece })(Aside);
