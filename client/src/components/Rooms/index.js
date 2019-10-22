import React, {useEffect, useState} from "react";
import {CentralBlock, Title} from "../common";
import { connect } from "react-redux";
import { getRooms, createRoom } from "../../actions"
import { Link } from "react-router-dom";
import {Button, Form, FormControl, FormGroup} from "react-bootstrap";
import Feedback from "react-bootstrap/Feedback";
import {ROUTES} from "../../constants";

const RoomsList = (props) => {
    useEffect(() => props.getRooms(), []);

    const [value, setValue] = useState("");

    const onChange = event => setValue(event.target.value);
    const onSubmit = (event) => {
        const player = props.player;
        const newRoom = {
            name: value,
            player
        };
        event.preventDefault();
        if (!player.name) {
            props.history.push(ROUTES.PLAYER)
        } else {
            props.createRoom(newRoom);
            setValue("");
        }
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
          </div>
      </CentralBlock>
    );
};

const mapStateToProps = (state) => ({
    rooms: state.rooms.rooms,
    player: state.player.player
});

export default connect(mapStateToProps, { getRooms, createRoom })(RoomsList);
