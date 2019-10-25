import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRooms } from "../../actions"
import Field from "../common/Field";
import { Col, Row, Spinner } from "react-bootstrap";
import Aside from "./Aside";
import { withRouter } from "react-router-dom";

const Game = (props) => {
    const roomId = parseInt(props.match.params.room);

    useEffect(() => {
       props.getRooms();
    }, []);

    const room = props.rooms.filter((room) => room.id === roomId)[0];

    return room ? (
      <>
        <div className="room-name">
            <h1>Room {room.name}</h1>
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
    rooms: state.rooms.rooms
});

export default withRouter(connect(mapStateToProps, { getRooms })(Game));
