import React, { useEffect, useState } from "react";
import {ButtonRef, CentralBlock, Title} from "../common";
import { connect } from "react-redux";
import { getRooms, createRoom } from "../../actions"
import { Link } from "react-router-dom";
import {Button, Form, FormControl, Modal} from "react-bootstrap";
import { ROUTES } from "../../constants";
import {localStorageKeys, localStorageService} from "../../store";

const RoomsList = (props) => {
    useEffect(() => props.getRooms(), []);

    const [show, setShow] = useState(false);
    const [value, setValue] = useState("");

    const onChange = event => setValue(event.target.value);
    const onSubmit = (event) => {
        // const token = localStorageService.readItem(localStorageKeys.TOKEN);
        // const newRoom = {
        //     name: value,
        //     token
        // };
        event.preventDefault();
        // props.createRoom(newRoom);
        // setValue("");
    };

    const onClick = () => setShow(true)

    return (
      <CentralBlock title="Choose the room or create a new one" close={true}>
          <div className="room-list">
              <ul>
                  {props.rooms.map((room) => {
                      return(
                        <li key={room.id}>
                            <Link to={`/${room.id}[<${room.player.name}>]`}>{room.name}</Link>
                        </li>)
                  })}
              </ul>
              <div className="buttons justify-content-center">
                  <Button type="submit" onClick={onClick}>Create</Button>
                  <Modal show={show} onHide={() => setShow(false)} >
                      <Modal.Header closeButton={true}>Create new room</Modal.Header>
                      <Modal.Body>
                          <Form onSubmit={onSubmit} className="create-room align-items-center">
                            <FormControl value={value} type="text" onChange={onChange}/>
                            <div className="buttons justify-content-center">
                                <Button disabled={!value} type="submit">Create</Button>
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
});

export default connect(mapStateToProps, { getRooms, createRoom })(RoomsList);
