import React, { useState } from "react";
import {CentralBlock, ButtonRef, Title} from "../common";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {Button, Form, FormControl, Modal} from "react-bootstrap";
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
      <div className="room--list">
        <ul>
          {roomsList.map((room) => (
            <Link key={room.id} to={`/${room.id}[<${room.lid.name}>]`}>
              <li className="room--item"><span className="room--id">{room.id}</span><span className="room--name">{room.name}</span></li>
            </Link>
          ))}
        </ul>
        <div className="buttons justify-content-end">
          <Button className="button" type="submit" onClick={onClick}>Create</Button>
          {randomRoom && <ButtonRef className="button" to={`/${randomRoom.id}[<${randomRoom.lid.name}>]`}>Start</ButtonRef>}
          <Modal show={show}>
            <Modal.Body>
              <Title title="Create new room"/>
              <Button className="close-button" onClick={() => setShow(false)}/>
              <Form onSubmit={onSubmit} className="create-room">
                <Form.Label column={false}>Room name</Form.Label>
                <FormControl value={name} type="text" onChange={onChange}/>
                <Form.Check
                  type="checkbox"
                  label="Multi player mode"
                  value={multi}
                  onChange={onCheck}
                />
                <div className="buttons justify-content-center">
                  <Button className="button" disabled={!name} type="submit">Create</Button>
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
