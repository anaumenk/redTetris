import React from "react";
import { createField } from "../../utility";
import { NO_COLOR } from "../../constants";

const Field = ({ fieldHeight, fieldWidth, fill, width, height, color, border, inverted }) => (
  <div
    className="field"
    style={{
        backgroundColor: color || NO_COLOR,
        borderColor: border || NO_COLOR,
        transform: inverted ? "rotate(180deg)" : "none"
    }}
  >
      {createField(fieldHeight, fieldWidth, fill).map((row, y) => {
          return (
            <div key={y}>
                {row.map((square, x) => {
                    return (
                      <div
                        className="piece"
                        style={{
                          width: width,
                          height: height,
                          backgroundColor: square.color
                        }}
                        key={x}
                      />
                    )
                })}
            </div>
          )
      })}
  </div>
);

export default Field;
