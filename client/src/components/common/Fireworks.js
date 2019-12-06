import React from "react";
import { FIREWORKS_COLORS } from "../../constants";

const Fireworks = () => (
  <div className="fireworks">
    {Object.values(FIREWORKS_COLORS).map((circle, index) => (
      <div key={`main-punt1-${index}`} className={circle}>
        {Array(24).fill(null).map((item, index) => <div key={`inner-punt1-${index}`} className="punt"/>)}
      </div>
    ))}
    {Object.values(FIREWORKS_COLORS).map((circle, index) => (
      <div key={`main-punt2-${index}`} className={`${circle}${index + 2}`}>
        {Array(24).fill(null).map((item, index) => <div key={`inner-punt2-${index}`} className="punt"/>)}
      </div>
    ))}
</div>);

export default Fireworks;
