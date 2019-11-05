import React, { useEffect } from "react";
import { connect } from "react-redux";
import { isRoom, getAllRooms } from "../../actions"
import Field from "../common/Field";
import { Col, Row, Spinner } from "react-bootstrap";
import Aside from "./Aside";
import { withRouter } from "react-router-dom";

const Game = (props) => {
    const roomId = parseInt(props.match.params.room);
    const playerName = props.match.params.player;

    useEffect(() => {
       props.isRoom(roomId, playerName);
       props.getAllRooms(roomId);
    }, []);

    return props.room ? (
      <>
        <div className="room-name">
            <h1>Room {props.room.name}</h1>
            {/*<ButtonRef variant="secondary" to={ROUTES.ROOT}>Homepage</ButtonRef>*/}
        </div>
          <Row>
            <Col>
              <Field
                fieldWidth={10}
                fieldHeight={20}
                size={70}
                color="#d5ecff6b"
                border="#989898b5"
                fill={[]}
              />
            </Col>
            <Col><Aside /></Col>
          </Row>
      </>
    ) : <div className="spinner"><Spinner animation="border" role="status" /></div>;
};

const mapStateToProps = (state) => ({
  room: state.rooms.room,
});

export default withRouter(connect(mapStateToProps, { isRoom, getAllRooms })(Game));
