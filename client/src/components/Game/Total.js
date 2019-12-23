import { Button, Modal } from "react-bootstrap";
import { AsideInfo, PlayerInfo, Snowfall } from "../common";
import React from "react";
import { GAME_STATUS, ROUTES } from "../../constants";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setGameStatus, cleanTheRoom } from "../../actions";
import Sound from 'react-sound';
import soundfile from '../../sounds/GameoverOne.wav';
window.soundManager.setup({debugMode: false});

const Total = ({ total, restartGame, status, lid, history, match, setGameStatus, cleanTheRoom }) => {
  const roomId = parseInt(match.params.room);
  const playersInfo = total ? total.map((player, index) => <PlayerInfo player={player} key={index}/>) : null;
  const exit = () => {
    setGameStatus(roomId, null);
    cleanTheRoom();
    history.push(ROUTES.MENU)
  };
  return (
    <Modal show={status === GAME_STATUS.STOP} onHide={restartGame}>
      <Sound
        autoLoad={true}
        url={soundfile}
        playStatus={Sound.status.PLAYING}
      />
      <Snowfall />
      <div className="modal-inner"/>
      <Modal.Header />
      <Modal.Body>
        <AsideInfo title={["Player", "Score"]} info={playersInfo} style={{color: "white"}}/>
        <div className="buttons christmas-buttons">
          {lid
            ? <Button onClick={restartGame} className="christmas-1">Restart</Button>
            : <Button className="christmas-1"/>
          }
          <Button className="christmas-2"/>
          <Button className="christmas-3"/>
          <Button className="christmas-4"/>
          <Button onClick={exit} className="christmas-5">Exit</Button>
        </div>
      </Modal.Body>
      <Modal.Footer/>
    </Modal>
  )
};

const mapStateToProps = state => ({
  status: state.rooms.status,
  lid: state.rooms.lid
});

export default withRouter(connect(mapStateToProps, { setGameStatus, cleanTheRoom })(Total));
