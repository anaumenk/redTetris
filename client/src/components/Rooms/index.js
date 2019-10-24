import React, { useEffect, useState } from "react";
import {ButtonRef, CentralBlock, Title} from "../common";
import { connect } from "react-redux";
import { getRooms, createRoom } from "../../actions"
import { Link } from "react-router-dom";
import { Button, Form, FormControl } from "react-bootstrap";
import { ROUTES } from "../../constants";
import {localStorageKeys, localStorageService} from "../../store";

const RoomsList = (props) => {
    useEffect(() => props.getRooms(), []);

    const [value, setValue] = useState("");

    const onChange = event => setValue(event.target.value);
    const onSubmit = (event) => {
        const token = localStorageService.readItem(localStorageKeys.TOKEN);
        const newRoom = {
            name: value,
            token
        };
        event.preventDefault();
        props.createRoom(newRoom);
        setValue("");
    };

    return (
      <CentralBlock title="Choose the room">
          <div className="room-list">
              <ul>
                  {props.rooms.map((room) => {
                      return(
                        <li key={room.id}>
                            <Link to={`/${room.id}[<${room.player.name}>]`}>{room.name}</Link>
                        </li>)
                  })}
              </ul>
              <Title title="or create a new one" />
              <div className="buttons">
                  <Form onSubmit={onSubmit} className="create-room">
                    <FormControl value={value} type="text" onChange={onChange}/>
                    <Button disabled={!value} type="submit">Create</Button>
                  </Form>
              </div>
            <div className="buttons">
              <ButtonRef to={ROUTES.ROOT} variant="secondary">Homepage</ButtonRef>
            </div>
          </div>
      </CentralBlock>
    );
};

const mapStateToProps = (state) => ({
    rooms: state.rooms.rooms,
});

export default connect(mapStateToProps, { getRooms, createRoom })(RoomsList);
