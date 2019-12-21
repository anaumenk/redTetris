import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAllRooms, nullifyCreatedRoom,
  setNextPiece, setNextTurn, setGameStatus,
} from "../../actions"
import { Field } from "../common";
import { Col, Row, Spinner } from "react-bootstrap";
import Aside from "./Aside";
import { withRouter } from "react-router-dom";
import { PIECES_DIRECTION, FIELD_HEIGHT, FIELD_WIDTH, GAME_STATUS, PIECES, UNSENT_INT, TIMEOUT } from "../../constants";
import {
  stopGame as stopGameApi, restartGame as restartGameApi, checkFieldFill,
  noMoreSpace, pieceMoving, getPieceTurn, scoreUpdate, mathSum,
  removePlayerFromRoom
} from "../../utility";
import Total from "./Total";
import Sound from 'react-sound';
import gameSound from '../../sounds/Doll House (Piano_Soft).mp3';
import starsSound from '../../sounds/magic.mp3';
window.soundManager.setup({debugMode: false});

const Game = (props) => {
  const roomId = parseInt(props.match.params.room);
  const playerName = props.match.params.player;
  const [pieceId, setPieceId] = useState(UNSENT_INT);
  const [field, setField] = useState([]);
  const [intervalId, setIntervalId] = useState(UNSENT_INT);
  const [key, setKey] = useState(UNSENT_INT);
  const [starsRow, setStarsRow] = useState([]);
  const [sound, setSoundPlay] = useState(false);

  useEffect(() => {
    const stars = starsRow;
    if (stars.length > 0) {
      setSoundPlay(true);
      setTimeout(() => {
        pieceMoving.moveAll(field, setField, stars);
        getPieceAndStartMoving();
        setStarsRow([]);
      }, 500)
    }
  }, [starsRow]);

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
          if (props.room.mode.rotation) {
            const newPieceTurn = getPieceTurn(false, props.currentPieceTurn, props.currentPieceFigure);
            const newPiecePlace = PIECES[props.currentPieceFigure][newPieceTurn];
            pieceMoving.rotation(field, pieceId, setField, newPiecePlace, props.setNextTurn);
          }
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
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      return removePlayerFromRoom(roomId);
    });
    return () => {
      window.removeEventListener("keydown", (e) => setKey(e.keyCode))
    }
  }, []);

  useEffect(() => {
    if (pieceId !== UNSENT_INT) {
      const newIntervalId = setInterval(() => {
        return pieceMoving.downInterval(field, pieceId, newIntervalId, getPieceAndStartMoving, setField);
      }, TIMEOUT - Object.keys(field).length * 10);
      setIntervalId(newIntervalId);
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
        }
        break;
      }
      default: {
        break;
      }
    }
  }, [props.status]);

  const sortPlayers = props.room ? Object.values(props.room.players).sort((a, b) => {
    return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
  }) : [];

  const addPieceToField = (piece) => {
    if (!noMoreSpace([...field], PIECES_DIRECTION.CURRENT, piece)) {
      setField([...field, piece]);
      setPieceId(piece.id);
    } else {
      scoreUpdate(-10, roomId);
      stopGame();
    }
  };

  const getPieceAndStartMoving = () => {
    let i = !props.room.mode.rotation && props.room.mode.inverted
      ? 100
      : (!props.room.mode.rotation || props.room.mode.inverted)
        ? 50
        : 10;
    const stars = checkFieldFill(field);
    if (stars.length > 0) {
      setStarsRow(stars);
      scoreUpdate(mathSum(stars.length, i), roomId)
    } else {
      const piece = {
        id: field.length,
        color: props.nextPieceColor,
        place: PIECES[props.nextPieceFigure][props.nextPieceTurn]
      };
      props.setNextPiece();
      addPieceToField(piece);
    }
  };

  const startGame = () => {
    const status = !props.status || props.status === GAME_STATUS.PAUSE ? GAME_STATUS.START : GAME_STATUS.PAUSE;
    props.setGameStatus(roomId, status);
  };

  const stopGame = () => {
    stopGameApi(roomId);
    props.setGameStatus(roomId, GAME_STATUS.STOP);
  };

  const restartGame = () => {
    restartGameApi(roomId);
    props.setGameStatus(roomId, null);
  };

  const handleSongFinishedPlaying = () => {
    setSoundPlay(false);
  };

  return props.room ? (
    <>
      <Sound
        autoLoad={true}
        url={gameSound}
        playStatus={props.room.status === GAME_STATUS.START ? Sound.status.PLAYING : Sound.status.STOPPED}
        loop={true}
      />
      <Sound
        autoLoad={true}
        url={starsSound}
        playStatus={sound ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={handleSongFinishedPlaying}
      />
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
              inverted={props.room.mode.inverted}
              stars={true}
              starsRow={starsRow}
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
  setNextTurn,
  setGameStatus,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
