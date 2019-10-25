import React from "react";
import {Field, AsideInfo, ButtonRef} from "../common";
import {ROUTES} from "../../constants";
import {Button} from "react-bootstrap";

const Aside = () => {
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

    const playersName = [
      {
        info: "first"
      },
      {
        info: "second"
      },
      {
        info: "3"
      }
    ];

    const playersScore = [
      {
        info: 10
      },
      {
        info: 40
      },
      {
        info: 0
      }
    ];

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

    const nextPiece = [
        {
          info: <Field
            fieldWidth={4}
            fieldHeight={4}
            size={10}
            fill={filledFirst}
          />
        }
    ];

    return (
      <div className="aside-container">
        <div className="buttons">
          <Button variant="secondary">Start/Pause</Button>
          <Button variant="secondary">Stop</Button>
          <Button variant="secondary">Restart</Button>
        </div>
        <AsideInfo
          title={["Next piece"]}
          info={[nextPiece]}
        />
        <AsideInfo
          title={["Players", "Score"]}
          info={[playersName, playersScore]}
        />
      </div>
    );
};

export default Aside;
