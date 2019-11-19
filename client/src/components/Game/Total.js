import { Button, Modal } from "react-bootstrap";
import { AsideInfo, ButtonRef, Title, PlayerInfo } from "../common";
import React from "react";
import { ROUTES } from "../../constants";
import { connect } from "react-redux";

const Total = ({ restart, setRestart, total }) => {
  const winner = total ? total.shift() : [];

  const winnerInfo = winner ? <PlayerInfo player={winner}/> : null;

  const close = () => {
    setRestart(false);
  };

  const playersInfo = total ? total.map((player, index) => <PlayerInfo player={player} key={index}/>) : null;

  return (
    <Modal show={restart} onHide={close}>
      <Modal.Header>The game is finished</Modal.Header>
      <Modal.Body>
        <Title title="Best score" />
        <AsideInfo title={["Player", "Score"]} info={winnerInfo}/>
        {total && total.length > 0 &&
          <>
            <Title title="Other" />
            <AsideInfo title={["Player", "Score"]} info={playersInfo}/>
          </>
        }
        <div className="buttons justify-content-center">
          <Button onClick={close}>Restart</Button>
          <ButtonRef variant="secondary" to={ROUTES.MENU}>Exit</ButtonRef>
        </div>
      </Modal.Body>
    </Modal>
  )
};

const mapStateToProps = state => ({
  total: state.rooms.total
});

export default connect(mapStateToProps)(Total);
