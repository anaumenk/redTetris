import React from "react";
import { createField } from "../../utility";
import { NO_COLOR } from "../../constants";

const Field = (props) => {
    const field = createField(props.fieldHeight, props.fieldWidth, props.fill);

    return (
      <div
        className="field"
        style={{
            backgroundColor: props.color || NO_COLOR,
            borderColor: props.border || NO_COLOR
        }}
      >
          {field.map((row, y) => {
              return (
                <div key={y}>
                    {row.map((square, x) => {
                        return (
                          <div
                            className="piece"
                            style={{
                              width: props.width,
                              height: props.height,
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
};

export default Field;
