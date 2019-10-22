import React from "react";

const Field = (props) => {
    const width = Array(props.width).fill(null).map((x, i) => i + 1);
    const height = new Array(props.height).fill(null).map((x, i) => i + 1);
    return (
      <div className="field" style={{backgroundColor: props.color || "transparent"}}>
          {height.map((item, index) => {
              return (
                <div key={index}>
                    {width.map((item, index) => {
                        return (
                          <div
                            className="piece"
                            style={{
                                width: props.size,
                                height: props.size,
                                borderColor: props.border || "transparent"
                            }}
                            key={index}
                          ></div>
                        )
                    })}
                </div>
              )
          })}
      </div>
    );
}

export default Field;
