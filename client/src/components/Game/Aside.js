import React from "react";
import AsideInfo from "../common/AsideInfo";
import {Field} from "../common";

const Aside = () => {
    const playersName = [{info: "first"}, {info: "second"}];
    const playersScore = [{info: 10}, {info: 300}];
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
    const filledSecond = [
      {
        color: "red",
        place: [
          [3, 0],
          [3, 1],
          [3, 2],
          [3, 3]
        ]
      },
    ];
    const playersNextPiece = [
        {
          info: <Field
            fieldWidth={4}
            fieldHeight={4}
            size={10}
            fill={filledFirst}
          />
        },
        {
          info: <Field
            fieldWidth={4}
            fieldHeight={4}
            size={10}
            fill={filledSecond}
          />
        }
    ];
    return (
      <>
          <AsideInfo
            title="Players"
            players={playersName}
          />
          <AsideInfo
            title="Score"
            players={playersScore}
          />
          <AsideInfo
            title="Next piece"
            players={playersNextPiece}
          />
      </>
    );
};

export default Aside;
