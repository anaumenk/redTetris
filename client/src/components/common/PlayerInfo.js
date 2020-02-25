import { Col, Row } from "react-bootstrap";
import React from "react";
import { Field } from "./index";
import { FIELD_HEIGHT, FIELD_WIDTH } from "../../constants";

const PlayerInfo = ({ player, show, currentPlayer }) => {
    const size = !show ? 6 : 4;
    return (
        <Row className="player-game-info">
            <Col sm={size}>{player.name}</Col>
            <Col sm={size}>{player.score}</Col>
            {show && <Col sm={size}>
                {!currentPlayer && <Field
                    fieldWidth={FIELD_WIDTH}
                    fieldHeight={FIELD_HEIGHT}
                    width={4}
                    height={4}
                    fill={player.field}/>}
                </Col>}
        </Row>
    );
};

export default PlayerInfo;
