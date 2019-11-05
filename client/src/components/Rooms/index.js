import React, { useEffect, useState } from "react";
import { CentralBlock } from "../common";
import { connect } from "react-redux";
import { getRooms, createRoom } from "../../actions"
import { Link, withRouter, Redirect } from "react-router-dom";
import {Button, Form, FormControl, Modal} from "react-bootstrap";

const RoomsList = (props) => {
    useEffect(() => props.getRooms(), []);

    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [multi, setMulti] = useState(false);

    const onChange = event => setName(event.target.value);
    const onCheck = () => setMulti(!multi);
    const onSubmit = (event) => {
        const newRoom = {
            name,
            multi
        };
        event.preventDefault();
        props.createRoom(newRoom);
        setName("");
        setMulti(false);
        setShow(false);
    };

    const onClick = () => setShow(true);

  return props.createdRoom
    ? (<Redirect to={`/${props.createdRoom.id}[<${props.createdRoom.lid.name}>]`} />)
    : (<CentralBlock title="Choose the room or create a new one" close={true}>
          <div className="room-list">
              <ul>
                  {props.rooms.map((room) => {
                      return(
                        <li key={room.id}>
                            <Link to={`/${room.id}[<${room.lid.name}>]`}>{room.name}</Link>
                        </li>)
                  })}
              </ul>
              <div className="buttons justify-content-center">
                  <Button type="submit" onClick={onClick}>Create</Button>
                  <Modal show={show} onHide={() => setShow(false)} >
                      <Modal.Header closeButton={true}>Create new room</Modal.Header>
                      <Modal.Body>
                          <Form onSubmit={onSubmit} className="create-room">
                            <Form.Label>Room name</Form.Label>
                            <FormControl value={name} type="text" onChange={onChange}/>
                            <Form.Check
                              type="checkbox"
                              label="Multi player mode"
                              value={multi}
                              onChange={onCheck}
                            />
                            <div className="buttons justify-content-center">
                                <Button disabled={!name} type="submit">Create</Button>
                            </div>
                          </Form>
                      </Modal.Body>
                  </Modal>
              </div>
          </div>
      </CentralBlock>
    );
};

const mapStateToProps = (state) => ({
    rooms: state.rooms.rooms,
    createdRoom: state.rooms.createdRoom,
});

export default withRouter(connect(mapStateToProps, { getRooms, createRoom })(RoomsList));
