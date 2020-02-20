import { Button, Modal } from "react-bootstrap";
import { AsideInfo, PlayerInfo } from "../common";
import React from "react";
import { GAME_STATUS, ROUTES, PLAYER_STATUS } from "../../constants";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setGameStatus, cleanTheRoom } from "../../actions";
import Sound from 'react-sound';
import soundfile from '../../sounds/GameoverOne.wav';
window.soundManager.setup({debugMode: false});

const Total = ({ total, restartGame, status, lid, history, match, setGameStatus, cleanTheRoom }) => {
  const roomId = parseInt(match.params.room);
  const playersInfo = total ? total.filter((player) => player.status !== PLAYER_STATUS.DELETED)
    .map((player, index) => <PlayerInfo player={player} key={index}/>) : null;
  const exit = () => {
    setGameStatus(roomId, null);
    cleanTheRoom();
    history.push(ROUTES.MENU)
  };
  return (
    <Modal show={status === GAME_STATUS.STOP} onHide={restartGame}>
      <Modal.Body>
        <Sound
          autoLoad={true}
          url={soundfile}
          playStatus={Sound.status.PLAYING}
        />
        <AsideInfo title={["Player", "Score"]} info={playersInfo}/>
        <div className="buttons">
          {lid && <Button onClick={restartGame} className="button">Restart</Button>}
          <Button onClick={exit} className="button">Exit</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
};

const mapStateToProps = state => ({
  status: state.rooms.status,
  lid: state.rooms.lid
});

export default withRouter(connect(mapStateToProps, { setGameStatus, cleanTheRoom })(Total));