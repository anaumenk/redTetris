import React from "react";
import { createField } from "../../utility";
import { NO_COLOR } from "../../constants";

const Field = ({ fieldHeight, fieldWidth, fill, width, height, border, inverted, stars, starsRow }) => (
  <div
    className="field"
    style={{
      borderColor: border || NO_COLOR,
      transform: inverted ? "rotate(180deg)" : "none"
    }}
  >
    {createField(fieldHeight, fieldWidth, fill).map((row, y) => (
      <div key={y}>
        {row.map((square, x) => (
          <div
            className="piece"
            style={{
              width: width,
              height: height,
              backgroundColor: square.color
            }}
            key={x}
          >
            {stars && [ 1, 2 ].map((star) => (
                <div
                  key={`star-${star}`}
                  className={`star star-${star} ${starsRow.includes(y) ? "show" : ""}`}
                />
            ))}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default Field;
