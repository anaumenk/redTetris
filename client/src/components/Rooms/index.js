import React, { useState } from "react";
import { CentralBlock, ButtonRef } from "../common";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { configAxios } from "../../axios";
import { API, METHODS } from "../../constants";

const RoomsList = ({ allRooms, history }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [multi, setMulti] = useState(false);

  const onChange = event => setName(event.target.value);
  const onCheck = () => setMulti(!multi);
  const onSubmit = () => {
    const newRoom = { name, multi };
    configAxios(METHODS.POST, API.POST_ROOM, newRoom)
    .then((response) => {
      const createdRoom = response.data.data;
      history.push(`/${createdRoom.id}[<${createdRoom.lid.name}>]`);
    })
    .catch((err) => console.log(err))
  };

  const onClick = () => setShow(true);

  const roomsList = allRooms.filter((room) => (room.multi && !room.status));
  const randomRoom = roomsList[Math.floor(Math.random() * Math.floor(allRooms.length))];

  return (
    <CentralBlock title="Choose the room or create a new one" close={true}>
      <div className="room-list">
        <ul>
          {roomsList.map((room) => (
            <Link key={room.id} to={`/${room.id}[<${room.lid.name}>]`}>
              <li>{room.name}</li>
            </Link>
          ))}
        </ul>
        <div className="buttons justify-content-center">
          <Button type="submit" onClick={onClick}>Create</Button>
          {randomRoom && <ButtonRef to={`/${randomRoom.id}[<${randomRoom.lid.name}>]`}>Start</ButtonRef>}
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
  allRooms: state.rooms.allRooms,
});

export default withRouter(connect(mapStateToProps)(RoomsList));
