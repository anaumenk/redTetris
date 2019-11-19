import React, { useEffect, useState } from "react";
import { CentralBlock } from "../common";
import { connect } from "react-redux";
import { getRooms, createRoom } from "../../actions"
import { Link, withRouter, Redirect } from "react-router-dom";
import {Button, Form, FormControl, Modal} from "react-bootstrap";

const RoomsList = ({ getRooms, createRoom, createdRoom, rooms }) => {
    useEffect(() => {
      getRooms();
    }, []);

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
        createRoom(newRoom);
        setName("");
        setMulti(false);
        setShow(false);
    };

    const onClick = () => setShow(true);

  return createdRoom
    ? (<Redirect to={`/${createdRoom.id}[<${createdRoom.lid.name}>]`} />)
    : (<CentralBlock title="Choose the room or create a new one" close={true}>
          <div className="room-list">
              <ul>
                  {rooms.map((room) => {
                      return (
                        <Link key={room.id} to={`/${room.id}[<${room.lid.name}>]`}>
                            <li>{room.name}</li>
                        </Link>
                      )
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
