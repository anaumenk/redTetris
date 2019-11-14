import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { isRoom, getAllRooms, nullifyCreatedRoom, setNextPiece } from "../../actions"
import Field from "../common/Field";
import { Col, Row, Spinner } from "react-bootstrap";
import Aside from "./Aside";
import { withRouter } from "react-router-dom";
import { fieldHeight, fieldWidth, PIECES, UNSENT_INT } from "../../constants";

const Game = (props) => {
  const roomId = parseInt(props.match.params.room);
  const playerName = props.match.params.player;
  const [pieceId, setPieceId] = useState(UNSENT_INT);
  const [game, setGame] = useState(false);
  const [field, setField] = useState([]);

  useEffect(() => props.nullifyCreatedRoom());

  useEffect(() => {
     props.isRoom(roomId, playerName);
     props.getAllRooms(roomId);
  }, []);

  useEffect(() => {
    if (pieceId !== UNSENT_INT) {
      const intervalId = setInterval(() => movePieceDown(intervalId), 100);
    }
  }, [pieceId]);

  const movePieceDown = (intervalId) => {
    const fieldIndex = field.findIndex((obj => obj.id === pieceId));
    let fieldPiecePlace = [...field[fieldIndex].place];
    if (fieldPiecePlace.find((line) => line[1] === 19)) {
      clearInterval(intervalId);
      getPieceAndStartMoving();
    } else {
      fieldPiecePlace = fieldPiecePlace.map((line) => {
        let newLine = [...line];
        newLine[1]++;
        return newLine;
      });
      setField(field.map((piece) => {
        if (piece.id === pieceId) {
          piece.place = fieldPiecePlace;
        }
        return piece;
      }));
    }
  };

  const addPieceToField = (piece) => {
    setField([...field, piece]);
    setPieceId(piece.id);
  };

  const getPieceAndStartMoving = () => {
    const piece = {
      id: field.length,
      color: props.nextPieceColor,
      place: PIECES[props.nextPieceFigure][props.nextPieceTurn]
    };
    props.setNextPiece();
    addPieceToField(piece);
  };

  const startGame = () => {
    setGame(!game);
    getPieceAndStartMoving();
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
  nextPieceColor: state.game.nextPieceColor,
});

const mapDispatchToProps = {
  isRoom,
  getAllRooms,
  nullifyCreatedRoom,
  setNextPiece,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
