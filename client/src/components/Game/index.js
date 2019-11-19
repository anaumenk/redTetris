import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAllRooms,
  nullifyCreatedRoom,
  setNextPiece,
  scoreUpdate,
  setNextTurn,
  stopGame
} from "../../actions"
import { Field } from "../common";
import { Col, Row, Spinner } from "react-bootstrap";
import Aside from "./Aside";
import { withRouter } from "react-router-dom";
import { DIRECTION, FIELD_HEIGHT, FIELD_WIDTH, PIECES, UNSENT_INT } from "../../constants";
import { checkFieldFill, noMoreSpace, pieceMoving, getPieceTurn } from "../../utility";
import Total from "./Total";

const Game = (props) => {
  const roomId = parseInt(props.match.params.room);
  const playerName = props.match.params.player;
  const [pieceId, setPieceId] = useState(UNSENT_INT);
  const [game, setGame] = useState(false);
  const [field, setField] = useState([]);
  const [intervalId, setIntervalId] = useState(UNSENT_INT);
  const [restart, setRestart] = useState(false);
  const [key, setKey] = useState(UNSENT_INT);

  useEffect(() => {
    if (game) {
      switch (key) {
        case 37: {
          pieceMoving.left(field, pieceId, setField);
          break;
        }
        case 39: {
          pieceMoving.right(field, pieceId, setField);
          break;
        }
        case 38: {
          const newPieceTurn = getPieceTurn(false, props.currentPieceTurn, props.currentPieceFigure);
          const newPiecePlace = PIECES[props.currentPieceFigure][newPieceTurn];
          pieceMoving.rotation(field, pieceId, setField, newPiecePlace, props.setNextTurn);
          break;
        }
        case 40: {
          pieceMoving.down(field, pieceId, setField);
          break;
        }
        case 32: {
          pieceMoving.downBottom(field, pieceId, setField);
          clearInterval(intervalId);
          getPieceAndStartMoving();
          break;
        }
        default: {
          break;
        }
      }
      setKey(UNSENT_INT);
    }
  }, [key]);

  useEffect(() => props.nullifyCreatedRoom());

  useEffect(() => {
     props.getAllRooms(roomId, playerName);
     window.addEventListener("keydown", (e) => setKey(e.keyCode));
  }, []);

  useEffect(() => {
    if (pieceId !== UNSENT_INT) {
      const newIntervalId = setInterval(() => {
            return pieceMoving.downInterval(field, pieceId, newIntervalId, getPieceAndStartMoving, setField);
      }, 1000);
      setIntervalId(newIntervalId)
    }
  }, [pieceId]);

  const sortPlayers = props.room ? Object.values(props.room.players).sort((a, b) => {
    return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
  }) : [];

  const addPieceToField = (piece) => {
    if (!noMoreSpace([...field], DIRECTION.CURRENT, piece)) {
      setField([...field, piece]);
      setPieceId(piece.id);
    } else {
      stopGame();
    }
  };

  const getPieceAndStartMoving = () => {
    let i = 10;
    while (checkFieldFill(field, setField)) {
      props.scoreUpdate(i, roomId);
      i += 10;
    }
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
    if (game) {
      clearInterval(intervalId)
    } else {
      if (pieceId === UNSENT_INT) {
        getPieceAndStartMoving();
      } else {
        const newIntervalId = setInterval(() => {
          return pieceMoving.downInterval(field, pieceId, newIntervalId, getPieceAndStartMoving, setField);
        }, 1000);
        setIntervalId(newIntervalId)
      }
    }
  };

  const stopGame = () => {
    setGame(!game);
    setPieceId(UNSENT_INT);
    setField([]);
    clearInterval(intervalId);
    setIntervalId(UNSENT_INT);
    setRestart(true);
    props.stopGame(roomId);
  };


  return props.room ? (
    <>
      <div className="room-name">
        <h1>Room {props.room.name}</h1>
      </div>
        <Row>
          <Col>
            <Field
              fieldWidth={FIELD_WIDTH}
              fieldHeight={FIELD_HEIGHT}
              width={45}
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
              stopGame={stopGame}
              players={sortPlayers}
            /></Col>
        </Row>
        <Total restart={restart} setRestart={setRestart} />
    </>
    ) : <div className="spinner"><Spinner animation="border" role="status" /></div>;
};

const mapStateToProps = (state) => ({
  room: state.rooms.room,
  nextPieceFigure: state.game.nextPieceFigure,
  nextPieceTurn: state.game.nextPieceTurn,
  nextPieceColor: state.game.nextPieceColor,
  currentPieceTurn: state.game.currentPieceTurn,
  currentPieceFigure: state.game.currentPieceFigure,
});

const mapDispatchToProps = {
  getAllRooms,
  nullifyCreatedRoom,
  setNextPiece,
  scoreUpdate,
  setNextTurn,
  stopGame,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
