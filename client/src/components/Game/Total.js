import { AsideInfo, PlayerInfo } from "../common";
import { Button, Modal } from "react-bootstrap";
import { GAME_STATUS, PLAYER_STATUS, ROUTES } from "../../constants";
import React from "react";
import Sound from 'react-sound';
import { cleanTheRoom } from "../../actions";
import { connect } from "react-redux";
import soundfile from '../../sounds/gameover.wav';
import { withRouter } from "react-router-dom";

window.soundManager.setup({ debugMode: false });

const Total = ({ total, restartGame, status, lid, history, cleanTheRoom }) => {
  const playersInfo = total ? total.filter((player) => player.status !== PLAYER_STATUS.DELETED)
    .map((player, index) => <PlayerInfo player={player} key={index} show={false}/>) : null;
  const exit = () => {
    restartGame();
    cleanTheRoom();
    history.push(ROUTES.MENU);
  };
  return (
    <Modal show={status === GAME_STATUS.STOP} onHide={restartGame}>
      <Modal.Body>
        <Sound
          autoLoad={true}
          url={soundfile}
          playStatus={Sound.status.PLAYING}
        />
        <AsideInfo title={[ "Player", "Score" ]} info={playersInfo}/>
        <div className="buttons">
          {lid && <Button onClick={restartGame} className="button">Restart</Button>}
          <Button onClick={exit} className="button">Exit</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = state => ({
  status: state.rooms.status,
  lid: state.rooms.lid
});

export default withRouter(connect(mapStateToProps, { cleanTheRoom })(Total));
