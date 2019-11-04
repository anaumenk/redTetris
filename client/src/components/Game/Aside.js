import React from "react";
import {Field, AsideInfo, ButtonRef} from "../common";
import {ROUTES} from "../../constants";
import {Button, Col, Row} from "react-bootstrap";

const Aside = (props) => {
    const players = [
      {
        id : 0,
        name: "first",
        score: 10
      },
      {
        id : 1,
        name: "second",
        score: 40
      },
      {
        id : 2,
        name: "3",
        score: 0
      },
    ];

  const playersInfo = Object.values(players).sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  }).map((player, index) => (
    <Row key={index} className="player-game-info">
      <Col sm={6}>{player.name}</Col>
      <Col sm={6}>{player.score}</Col>
    </Row>
  ));

    const filledFirst = [
      {
        color: "black",
        place: [
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 2]
        ]
      },
    ];

    const nextPiece = <Field
      fieldWidth={4}
      fieldHeight={4}
      size={10}
      fill={filledFirst}
    />;

    return (
      <div className="aside-container">
        {props.lid && <div className="buttons">
          <Button variant="secondary">Start/Pause</Button>
          <Button variant="secondary">Stop</Button>
          <Button variant="secondary">Restart</Button>
        </div>}
        <AsideInfo
          title={["Next piece"]}
          info={nextPiece}
        />
        <AsideInfo
          title={["Players", "Score"]}
          info={playersInfo}
        />
      </div>
    );
};

export default Aside;
