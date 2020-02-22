import React, { useState } from "react";
import { ButtonRef, CentralBlock, Title } from "../common";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { configAxios } from "../../axios";
import { API, METHODS } from "../../constants";

const RoomsList = ({ allRooms, history }) => {
  const [ show, setShow ] = useState(false);
  const [ name, setName ] = useState("");
  const [ multi, setMulti ] = useState(false);
  const [ error, setError ] = useState("");

  const onChange = event => {
    setError("");
    setName(event.target.value);
  };

  const onCheck = () => setMulti(!multi);

  const onSubmit = (e) => {
    e.preventDefault();
    const newRoom = { name, multi };
    configAxios(METHODS.POST, API.POST_ROOM, newRoom)
    .then((response) => {
      if (!response.data.error) {
        const createdRoom = response.data.data;
        history.push(`/${createdRoom.id}[<${createdRoom.lid.name}>]`);
      } else {
        setError(response.data.error);
      }
    })
    .catch((err) => console.log(err));
  };

  const onClick = () => setShow(true);

  const onHide = () => {
    setShow(false);
    setName("");
    setMulti(false);
    setError("");
  };

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
          <Modal show={show} onHide={onHide}>
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
                {!!error && <div className="error">{error}</div>}
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
