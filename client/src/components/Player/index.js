import React, { useEffect, useState } from "react";
import { CentralBlock } from "../common";
import { Col, Row } from "react-bootstrap";
import { API, METHODS } from "../../constants";
import { configAxios } from "../../axios";

const Player = () => {
    const [ player, setPlayer ] = useState("");
    const [ error, setError ] = useState("");

    useEffect(() => {
      configAxios(METHODS.POST, API.GET_PLAYER)
        .then((response) => {
          if (response) {
            const data = response.data;
            if (!data.error && data.data) {
              setPlayer(data.data.player);
            } else {
              setError(data.error);
            }
          }
      });
    }, []);

    return (
      <CentralBlock title="Player" close={true}>
        {!error && player ? (
          <div className="player-info">
            <Row>
              <Col sm="6" className="player-info--name">Name</Col>
              <Col sm="6" className="player-info--number">{player.name}</Col>
            </Row>
            <Row>
              <Col sm="6" className="player-info--name">Score</Col>
              <Col sm="6" className="player-info--number">{player.score}</Col>
            </Row>
          </div>
        ) : (
          <div className="error">{error}</div>
        )}
      </CentralBlock>
    );
};

export default Player;
