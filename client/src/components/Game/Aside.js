import React from "react";
import AsideInfo from "../common/AsideInfo";
import {Field} from "../common";

const Aside = () => {
    const playersName = [{info: "first"}, {info: "second"}];
    const playersScore = [{info: 10}, {info: 300}];
    const playersNextPiece = [
        {info: <Field width={4} height={4} size={10} />},
        {info: <Field width={4} height={4} size={10}/>}
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
