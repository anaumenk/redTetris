import { Col, Row } from "react-bootstrap";
import React from "react";
import {Field} from "./index";
import {FIELD_HEIGHT, FIELD_WIDTH, PIECES} from "../../constants";

const PlayerInfo = ({ player, total }) => {
    const size = total ? 6 : 4;
    return (
        <Row className="player-game-info">
            <Col sm={size}>{player.name}</Col>
            <Col sm={size}>{player.score}</Col>
            {!total && <Col sm={size}>
                <Field
                    fieldWidth={FIELD_WIDTH}
                    fieldHeight={FIELD_HEIGHT}
                    width={4}
                    height={4}
                    fill={[
                    {
                        color: "#86ACBB",
                        place: player.field || PIECES["I"][0]
                    },
                ]}/>
                </Col>}
        </Row>
    );
};

export default PlayerInfo;
