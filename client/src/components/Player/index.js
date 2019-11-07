import React, { useEffect, useState } from "react";
import { CentralBlock } from "../common";
import { Col, Row} from "react-bootstrap";
import { API, METHODS } from "../../constants";
import { configAxios } from "../../axios";

const Player = () => {
    const [player, setPlayer] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
      configAxios(METHODS.POST, API.GET_PLAYER)
        .then((response) => {
          const data = response.data;
          if (!data.error) {
            setPlayer(data.data.player);
          }
          else {
            setError(data.error);
          }
      });
    }, []);

    return (
      <CentralBlock title="Player" close={true}>
        {!error ? (
          <div className="player-info">
            <Row>
              <Col sm="6">Name</Col>
              <Col sm="6">{player.name}</Col>
            </Row>
            <Row>
              <Col sm="6">Score</Col>
              <Col sm="6">{player.score}</Col>
            </Row>
          </div>
        ) : (
          <div className="error">{error}</div>
        )}
      </CentralBlock>
    );
};

export default Player;
