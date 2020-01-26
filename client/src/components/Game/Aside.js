import React, { useEffect } from "react";
import { Field, AsideInfo, PlayerInfo } from "../common";
import { Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { GAME_MODES, GAME_STATUS, PIECES, PLAYER_STATUS } from "../../constants";
import { isRoomLid } from "../../actions";
import { changeGameMode } from "../../utility"
import { withRouter } from "react-router-dom";

const Aside = (props) => {
  const roomId = parseInt(props.match.params.room);

  useEffect(()=> {
    props.isRoomLid(roomId, props.match.params.player)
  }, []);

  const playersInfo = props.players
    .filter((player) => player.status === PLAYER_STATUS.GAME)
    .map((player, index) => <PlayerInfo key={index} player={player} />);

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

  const changeMode = (e) => {
    if (props.status !== GAME_STATUS.START) {
      switch (e.currentTarget.value) {
        case GAME_MODES.NO_ROTATION: {
          changeGameMode(roomId, "rotation", !props.mode.rotation);
          break;
        }
        case GAME_MODES.INVERTED_FIELD: {
          changeGameMode(roomId, "inverted", !props.mode.inverted);
          break;
        }
        default: {
          break;
        }
      }
    }
  };

  const gameModes = props.lid ? (
    <Row className="buttons">
        <Button
          active={!props.mode.rotation}
          onClick={changeMode}
          className="outline-button"
          value={GAME_MODES.NO_ROTATION}
        >
          {GAME_MODES.NO_ROTATION}
        </Button>
        <Button
          active={props.mode.inverted}
          className="outline-button"
          onClick={changeMode}
          value={GAME_MODES.INVERTED_FIELD}
        >
          {GAME_MODES.INVERTED_FIELD}
        </Button>
      </Row>
    ) : (
    <Col>
      {!props.mode.rotation && <p>{GAME_MODES.NO_ROTATION}</p>}
      {props.mode.inverted && <p>{GAME_MODES.INVERTED_FIELD}</p>}
    </Col>
  );

  return (
    <div className="aside-container">
      {props.lid && <div className="buttons">
        {
          props.status !== GAME_STATUS.START
          && <Button className="button" onClick={props.startGame}>Start</Button>
        }
        {props.status === GAME_STATUS.START &&
          <>
            <Button className="button" onClick={props.startGame}>Pause</Button>
            <Button className="button" onClick={props.stopGame}>Stop</Button>
          </>
        }
      </div>}
      <AsideInfo title={["Modes"]} info={gameModes}/>
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
  lid: state.rooms.lid,
  status: state.rooms.status,
  nextPieceFigure: state.game.nextPieceFigure,
  nextPieceTurn: state.game.nextPieceTurn,
  nextPieceColor: state.game.nextPieceColor,
  mode: state.rooms.room.mode,
});

export default withRouter(connect(mapStateToProps, { isRoomLid })(Aside));
