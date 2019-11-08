import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { isRoom, getAllRooms, nullifyCreatedRoom, setNextPiece } from "../../actions"
import Field from "../common/Field";
import { Col, Row, Spinner } from "react-bootstrap";
import Aside from "./Aside";
import { withRouter } from "react-router-dom";
import {fieldHeight, fieldWidth, PIECES} from "../../constants";
import {movePieceDown} from "../../utility/piece";

const Game = (props) => {
  const roomId = parseInt(props.match.params.room);
  const playerName = props.match.params.player;
  const [piece, movePiece] = useState([]);
  const [game, setGame] = useState(false);
  const [field, setField] = useState([]);

  useEffect(() => {
     props.isRoom(roomId, playerName);
     props.getAllRooms(roomId);
  }, []);

  useEffect(() => props.nullifyCreatedRoom());

  const addPieceToField = (piece) => {
    setField([...field, piece]);
    return field.length - 1;
  };

  const movePieceOnField = (pieceIndex, piecePlace) => {
    const newField = [...field];
    console.log(newField)
    newField[pieceIndex] = piecePlace;
    console.log(newField)
    setField(newField);
  };

  const startGame = () => {
    setGame(!game);
    const piece = {
      color: "yellow",
      place: PIECES[props.nextPieceFigure][props.nextPieceTurn]
    };
    const pieceIndex = addPieceToField(piece);
    setInterval(() => movePieceDown(pieceIndex, piece.place, movePieceOnField), 1000);
    props.setNextPiece();
  };

  return props.room ? (
    <>
      <div className="room-name">
        <h1>Room {props.room.name}</h1>
      </div>
        <Row>
          <Col>
            <Field
              fieldWidth={fieldWidth}
              fieldHeight={fieldHeight}
              width={55}
              height={45}
              color="#d5ecff6b"
              border="#989898b5"
              // fill={[
              //   {
              //     color: "yellow",
              //     place: piece
              //   }
              // ]}
              fill={field}
            />
          </Col>
          <Col>
            <Aside
              game={game}
              startGame={startGame}
            /></Col>
        </Row>
    </>
    ) : <div className="spinner"><Spinner animation="border" role="status" /></div>;
};

const mapStateToProps = (state) => ({
  room: state.rooms.room,
  nextPieceFigure: state.game.nextPieceFigure,
  nextPieceTurn: state.game.nextPieceTurn,
});

const mapDispatchToProps = {
  isRoom,
  getAllRooms,
  nullifyCreatedRoom,
  setNextPiece,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
