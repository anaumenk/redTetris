import { ButtonRef, Field } from "../common";
import { Col, Row, Spinner } from "react-bootstrap";
import {
  FIELD_HEIGHT, FIELD_WIDTH,
  GAME_STATUS, GREY_COLOR,
  PIECES, PIECES_DIRECTION,
  ROUTES, TIMEOUT,
  UNSENT_INT
} from "../../constants";
import React, { useEffect, useState } from "react";
import { checkFieldFill, getPieceTurn, mathSum, noMoreSpace, pieceMoving, sort } from "../../utility";
import {
  isRoomLid, removePlayerFromRoom, restartGame as restartGameApi, scoreUpdate, sendField,
  setGameStatus, setNextPiece, setNextTurn, setRoom,
  stopGame as stopGameApi
} from "../../actions";
import Aside from "./Aside";
import Sound from 'react-sound';
import Total from "./Total";
import { connect } from "react-redux";
import gameSound from '../../sounds/game.mp3';
import starsSound from '../../sounds/stars.mp3';
import { withRouter } from "react-router-dom";

window.soundManager.setup({ debugMode: false });

const Game = (props) => {
  const roomId = parseInt(props.match.params.room);
  const playerName = props.match.params.player;
  const [ pieceId, setPieceId ] = useState(UNSENT_INT);
  const [ field, setField ] = useState([]);
  const [ intervalId, setIntervalId ] = useState(UNSENT_INT);
  const [ key, setKey ] = useState(UNSENT_INT);
  const [ starsRow, setStarsRow ] = useState([]);
  const [ sound, setSoundPlay ] = useState(false);
  const [ spinner, changeSpinner ] = useState(<Spinner animation="border" role="status" />);

  useEffect(() => {
    props.setRoom(roomId, playerName);
    props.isRoomLid(roomId, playerName);
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      props.removePlayerFromRoom(roomId);
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, []);

  window.onbeforeunload = () => props.removePlayerFromRoom(roomId);

  useEffect(() => {
    const stars = starsRow;
    if (stars.length > 0) {
      setSoundPlay(true);
      setTimeout(() => {
        pieceMoving.moveAll(field, setField, stars);
        getPieceAndStartMoving();
        setStarsRow([]);
      }, 500);
    }
  }, [ starsRow ]);

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
  }, [ key ]);

  const handleUserKeyPress = event => {
    event.preventDefault();
    setKey(event.keyCode);
  };

  useEffect(() => {
    let newIntervalId = UNSENT_INT;
    if (pieceId !== UNSENT_INT) {
      newIntervalId = setInterval(() => {
        return pieceMoving.downInterval(field, pieceId, newIntervalId, getPieceAndStartMoving, setField);
      }, TIMEOUT - Object.keys(field).length * 10);
      setIntervalId(newIntervalId);
    }
    return () => {
      clearInterval(newIntervalId);
    };
  }, [ pieceId ]);

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
  }, [ props.status ]);

  useEffect(() => {
    if (props.indestruct > 0 && props.room.status !== GAME_STATUS.STOP) {
      if (!pieceMoving.up(field, setField, intervalId, getPieceAndStartMoving, pieceId, setIntervalId)) {
        loseGame();
      }
    }
  }, [ props.indestruct ]);

  useEffect(() => {
    props.sendField(roomId, field);
  }, [ field ]);

  if (!props.room) {
    setTimeout(() => {
      changeSpinner(
          <>
            <h1 className="spinner__title">Ooooops no such room</h1>
            <ButtonRef to={ROUTES.ROOMS} className="button">Go to the room list</ButtonRef>
          </>
      );
    }, 3000);
  }

  const loseGame = () => {
    props.scoreUpdate(-10, roomId);
    stopGame();
  };

  const addPieceToField = (piece, field) => {
    if (!noMoreSpace([ ...field ], PIECES_DIRECTION.CURRENT, piece)) {
      setField([ ...field, piece ]);
      setPieceId(piece.id);
    } else {
      loseGame();
    }
  };

  const getPieceAndStartMoving = (newField = field) => {
    let i = !props.room.mode.rotation && props.room.mode.inverted
      ? 100
      : (!props.room.mode.rotation || props.room.mode.inverted)
        ? 50
        : 10;
    const stars = checkFieldFill(newField);
    if (stars.length > 0) {
      setStarsRow(stars);
      props.scoreUpdate(mathSum(stars.length, i), roomId);
    } else {
      const piece = {
        id: newField.length,
        color: props.nextPieceColor,
        place: PIECES[props.nextPieceFigure][props.nextPieceTurn]
      };
      props.setNextPiece();
      addPieceToField(piece, newField);
    }
  };

  const startGame = () => {
    if (props.inGame) {
      const status = !props.status || props.status === GAME_STATUS.PAUSE ? GAME_STATUS.START : GAME_STATUS.PAUSE;
      props.setGameStatus(roomId, status);
    }
  };

  const stopGame = () => {
    if (props.inGame) {
      props.stopGameApi(roomId);
      props.setGameStatus(roomId, GAME_STATUS.STOP);
    }
  };

  const restartGame = () => {
    if (props.inGame) {
      props.restartGameApi(roomId);
      props.setGameStatus(roomId, null);
    }
  };

  const handleSongFinishedPlaying = () => {
    setSoundPlay(false);
  };

  return props.room && props.inGame ? (
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
              width={30}
              height={30}
              border={GREY_COLOR}
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
            /></Col>
        </Row>
        <Total restartGame={restartGame} total={sort(props.room)}/>
    </>
    ) : <div className="spinner">{spinner}</div>;
};

const mapStateToProps = (state) => ({
  room: state.rooms.room,
  status: state.rooms.status,
  nextPieceFigure: state.game.nextPieceFigure,
  nextPieceTurn: state.game.nextPieceTurn,
  nextPieceColor: state.game.nextPieceColor,
  currentPieceTurn: state.game.currentPieceTurn,
  currentPieceFigure: state.game.currentPieceFigure,
  lid: state.rooms.lid,
  inGame: state.rooms.inGame,
  indestruct: state.rooms.indestruct
});

const mapDispatchToProps = {
  setNextPiece,
  setNextTurn,
  setRoom,
  isRoomLid,
  stopGameApi,
  scoreUpdate,
  restartGameApi,
  removePlayerFromRoom,
  sendField,
  setGameStatus
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
