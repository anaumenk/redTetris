import React, { useEffect, useState } from "react";
import {ButtonRef, CentralBlock} from "../common";
import { FormControl } from "react-bootstrap";
import {connect} from "react-redux";
import { setPlayer } from "../../actions"
import {ROUTES} from "../../constants";

const Player = (props) => {
    const [value, setValue] = useState(props.player.name);

    useEffect(() => {
        props.setPlayer(value);
    }, [value]);

    const onChange = event => setValue(event.target.value);

    return (
      <CentralBlock title="Create a player">
          <FormControl value={value} type="text" onChange={onChange}/>
          <div className="buttons">
            <ButtonRef disabled={!value} to={ROUTES.ROOMS}>Create</ButtonRef>
          </div>
      </CentralBlock>
    );
}

const mapStateToProps = state => ({
    player: state.player.player,
});

export default connect(mapStateToProps, { setPlayer })(Player);
