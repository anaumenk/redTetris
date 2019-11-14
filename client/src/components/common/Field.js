import React from "react";

const Field = (props) => {
    let field = Array(props.fieldHeight)
      .fill(Array(props.fieldWidth).fill({color: "transparent"}));

    props.fill.forEach((item) => {
      item.place.forEach((place) => {
        const x = place[0];
        const y = place[1];
        field = field.map((row, i) => row.map((square, j) => j === x && i === y ? {color: item.color} : square));
      })
    });

    return (
      <div
        className="field"
        style={{
            backgroundColor: props.color || "transparent",
            borderColor: props.border || "transparent"
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
