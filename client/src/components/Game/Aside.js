import { AsideInfo, Field, PlayerInfo } from "../common";
import { Button, Col, Row } from "react-bootstrap";
import { GAME_MODES, GAME_STATUS, PIECES, PLAYER_STATUS } from "../../constants";
import React  from "react";
import { changeGameMode } from "../../actions";
import { connect } from "react-redux";
import { sort } from "../../utility";
import { withRouter } from "react-router-dom";

const Aside = (props) => {
  const roomId = parseInt(props.match.params.room);

  const sortPlayers = sort(props.room);

  const playersInfo = sortPlayers
    .filter((player) => player.status === PLAYER_STATUS.GAME)
    .map((player, index) => {
        return (<PlayerInfo
            key={index}
            player={player}
            show={true}
            currentPlayer={player.id === props.user}
        />);
    });

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
          props.changeGameMode(roomId, "rotation", !props.mode.rotation);
          break;
        }
        case GAME_MODES.INVERTED_FIELD: {
          props.changeGameMode(roomId, "inverted", !props.mode.inverted);
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
      <AsideInfo title={[ "Modes" ]} info={gameModes}/>
      <AsideInfo
        title={[ "Next piece" ]}
        info={nextPiece}
      />
      <AsideInfo
        title={[ "Players", "Score", "Field" ]}
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
  room: state.rooms.room,
  user: state.auth.user
});

const mapDispatchToProps = {
  changeGameMode
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Aside));
