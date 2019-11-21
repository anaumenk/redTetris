import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAllRooms,
  nullifyCreatedRoom,
  setNextPiece,
  scoreUpdate,
  setNextTurn,
  stopGame,
  setGameStatus,
  restartGame,
} from "../../actions"
import { Field } from "../common";
import { Col, Row, Spinner } from "react-bootstrap";
import Aside from "./Aside";
import { withRouter } from "react-router-dom";
import {DIRECTION, FIELD_HEIGHT, FIELD_WIDTH, GAME_STATUS, PIECES, UNSENT_INT} from "../../constants";
import { checkFieldFill, noMoreSpace, pieceMoving, getPieceTurn } from "../../utility";
import Total from "./Total";

const Game = (props) => {
  const roomId = parseInt(props.match.params.room);
  const playerName = props.match.params.player;
  const [pieceId, setPieceId] = useState(UNSENT_INT);
  const [field, setField] = useState([]);
  const [intervalId, setIntervalId] = useState(UNSENT_INT);
  const [key, setKey] = useState(UNSENT_INT);

  useEffect(() => {
    if (props.status === GAME_STATUS.START) {
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

  useEffect(() => {
    switch (props.status) {
      case null:
      case GAME_STATUS.STOP: {
        setPieceId(UNSENT_INT);
        setField([]);
        clearInterval(intervalId);
        setIntervalId(UNSENT_INT);
        break;
      }
      case GAME_STATUS.PAUSE: {
        clearInterval(intervalId);
        break;
      }
      case GAME_STATUS.START: {
        if (pieceId === UNSENT_INT) {
          getPieceAndStartMoving();
        } else {
          const newIntervalId = setInterval(() => {
            return pieceMoving.downInterval(field, pieceId, newIntervalId, getPieceAndStartMoving, setField);
          }, 1000);
          setIntervalId(newIntervalId);
          break;
        }
      }
    }
  }, [props.status]);

  const sortPlayers = props.room ? Object.values(props.room.players).sort((a, b) => {
    return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
  }) : [];

  const addPieceToField = (piece) => {
    if (!noMoreSpace([...field], DIRECTION.CURRENT, piece)) {
      setField([...field, piece]);
      setPieceId(piece.id);
    } else {
      props.scoreUpdate(-10, roomId);
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
    const status = !props.status || props.status === GAME_STATUS.PAUSE ? GAME_STATUS.START : GAME_STATUS.PAUSE;
    props.setGameStatus(roomId, status);
  };

  const stopGame = () => {
    props.stopGame(roomId);
    props.setGameStatus(roomId, GAME_STATUS.STOP);
  };

  const restartGame = () => {
    props.restartGame(roomId);
    props.setGameStatus(roomId, null);
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
              startGame={startGame}
              stopGame={stopGame}
              players={sortPlayers}
            /></Col>
        </Row>
        <Total restartGame={restartGame} total={sortPlayers}/>
    </>
    ) : <div className="spinner"><Spinner animation="border" role="status" /></div>;
};

const mapStateToProps = (state) => ({
  room: state.rooms.room,
  status: state.rooms.status,
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
  setGameStatus,
  restartGame,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
