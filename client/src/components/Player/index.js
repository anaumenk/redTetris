import React, { useEffect, useState } from "react";
import { ButtonRef, CentralBlock } from "../common";
import { Button, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { setPlayer } from "../../actions"
import { ROUTES } from "../../constants";
import { IsLogin } from "../../utility";
import {localStorageKeys, localStorageService} from "../../store";

const Player = (props) => {
    const [player, setPlayer] = useState(IsLogin());
    const [value, setValue] = useState(localStorageService.readItem(localStorageKeys.PLAYER));

    useEffect(() => {
      props.setPlayer(value);
    }, [value]);

    const onChange = event => setValue(event.target.value);
    const onSubmit = () => {
      localStorageService.createOrUpdateItem(localStorageKeys.PLAYER, props.player.name);
      // setPlayer(isPlayer());
    }

    return player
      ? (
        <CentralBlock title="Player">
          <FormControl value={value} type="text" onChange={onChange}/>
          <div className="buttons">
            <Button disabled={!value} onClick={onSubmit}>Change</Button>
            {/*<ButtonRef to={ROUTES.ROOMS}>Game rooms</ButtonRef>*/}
            <ButtonRef to={ROUTES.ROOT} variant="secondary">Homepage</ButtonRef>
          </div>
        </CentralBlock>
      )
      : (
        <CentralBlock title="Create a player">
          <FormControl value={value} type="text" onChange={onChange}/>
          <div className="buttons">
            <Button disabled={!value} onClick={onSubmit}>Create</Button>
            <ButtonRef to={ROUTES.ROOT} variant="secondary">Homepage</ButtonRef>
          </div>
        </CentralBlock>
      );
};

const mapStateToProps = state => ({
    player: state.player.player,
});

export default connect(mapStateToProps, { setPlayer })(Player);
