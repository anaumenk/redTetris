import './snowfall.css';
import React from "react";

const Snowfall = () => [1, 2, 3, 4].map(item => (
    <div key={`snow-group-${item}`} className={`snowfall group-${item}`}>
      <div className="inner">
        {Array(103).fill(null).map((item, index) => <i key={`show-${index}`}/>)}
      </div>
    </div>
));

export default Snowfall;
