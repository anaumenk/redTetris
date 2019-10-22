import React, {useEffect} from "react";
import {connect} from "react-redux";
import { getRooms } from "../../actions"
import Field from "../common/Field";
import {Col, Row} from "react-bootstrap";
import Aside from "./Aside";

const Game = (props) => {
    const roomId = parseInt(props.match.params.room);

    useEffect(() => {
        props.getRooms()
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
                    width={10}
                    height={20}
                    size={70}
                    color="#d5ecff6b"
                    border="#989898b5"
                  />
              </Col>
              <Col><Aside /></Col>
          </Row>
      </>
    ) : null;
};

const mapStateToProps = (state) => ({
    rooms: state.rooms.rooms
});

export default connect(mapStateToProps, { getRooms })(Game);
