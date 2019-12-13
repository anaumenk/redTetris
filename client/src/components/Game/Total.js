import { Button, Modal } from "react-bootstrap";
import { AsideInfo, Title, PlayerInfo } from "../common";
import React from "react";
import { GAME_STATUS, ROUTES } from "../../constants";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setGameStatus } from "../../actions";
import Sound from 'react-sound';
import soundfile from '../../sounds/GameoverOne.wav';
window.soundManager.setup({debugMode: false});

const Total = ({ total, restartGame, status, lid, history, match, setGameStatus }) => {
  const totalCopy = total ? [...total] : [];
  const winner = totalCopy ? totalCopy.shift() : [];
  const roomId = parseInt(match.params.room);

  const winnerInfo = winner ? <PlayerInfo player={winner}/> : null;

  const playersInfo = totalCopy ? totalCopy.map((player, index) => <PlayerInfo player={player} key={index}/>) : null;

  const exit = () => {
    setGameStatus(roomId, null);
    history.push(ROUTES.MENU)
  };

  return (
    <Modal show={status === GAME_STATUS.STOP} onHide={restartGame}>
      <Sound
        autoLoad={true}
        url={soundfile}
        playStatus={Sound.status.PLAYING}
        loop={true}
      />
      <Modal.Header>The game is finished</Modal.Header>
      <Modal.Body>
        <Title title="Best score" />
        <AsideInfo title={["Player", "Score"]} info={winnerInfo}/>
        {totalCopy && totalCopy.length > 0 &&
          <>
            <Title title="Other" />
            <AsideInfo title={["Player", "Score"]} info={playersInfo}/>
          </>
        }
        <div className="buttons justify-content-center">
          {lid && <Button onClick={restartGame}>Restart</Button>}
          <Button onClick={exit} variant="secondary">Exit</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
};

const mapStateToProps = state => ({
  status: state.rooms.status,
  lid: state.rooms.lid
});

export default withRouter(connect(mapStateToProps, { setGameStatus })(Total));
