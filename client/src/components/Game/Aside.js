import React, { useEffect } from "react";
import { Field, AsideInfo, PlayerInfo } from "../common";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { GAME_STATUS, PIECES } from "../../constants";
import { isRoomLid } from "../../actions";
import { withRouter } from "react-router-dom";

const Aside = (props) => {
  useEffect(()=> {
    props.isRoomLid(parseInt(props.match.params.room), props.match.params.player)
  }, []);

  const playersInfo = props.players.map((player, index) => <PlayerInfo key={index} player={player} />);

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
        {props.status !== GAME_STATUS.START && <Button variant="secondary" onClick={props.startGame}>Start</Button>}
        {props.status === GAME_STATUS.START &&
          <>
            <Button variant="secondary" onClick={props.startGame}>Pause</Button>
            <Button variant="secondary" onClick={props.stopGame}>Stop</Button>
          </>
        }
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
  lid: state.rooms.lid,
  status: state.rooms.status,
  nextPieceFigure: state.game.nextPieceFigure,
  nextPieceTurn: state.game.nextPieceTurn,
  nextPieceColor: state.game.nextPieceColor,
});

export default withRouter(connect(mapStateToProps, { isRoomLid })(Aside));
