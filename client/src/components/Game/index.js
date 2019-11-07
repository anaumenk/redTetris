import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { isRoom, getAllRooms, nullifyCreatedRoom } from "../../actions"
import Field from "../common/Field";
import { Col, Row, Spinner } from "react-bootstrap";
import Aside from "./Aside";
import { withRouter } from "react-router-dom";
import { fieldHeight, fieldWidth } from "../../constants";

const Game = (props) => {
  const roomId = parseInt(props.match.params.room);
  const playerName = props.match.params.player;
  const [piece, movePiece] = useState([]);
  const [game, setGame] = useState(false);

  useEffect(() => {
     props.isRoom(roomId, playerName);
     props.getAllRooms(roomId);
  }, []);

  useEffect(() => props.nullifyCreatedRoom());

  return props.room ? (
    <>
      <div className="room-name">
        <h1>Room {props.room.name}</h1>
      </div>
        <Row>
          <Col>
            <Field
              fieldWidth={fieldWidth}
              fieldHeight={fieldHeight}
              width={55}
              height={45}
              color="#d5ecff6b"
              border="#989898b5"
              fill={[
                {
                  color: "yellow",
                  place: piece
                }
              ]}
            />
          </Col>
          <Col><Aside game={game} setGame={setGame} movePiece={movePiece}/></Col>
        </Row>
    </>
    ) : <div className="spinner"><Spinner animation="border" role="status" /></div>;
};

const mapStateToProps = (state) => ({
  room: state.rooms.room,
});

export default withRouter(connect(mapStateToProps, { isRoom, getAllRooms, nullifyCreatedRoom })(Game));
