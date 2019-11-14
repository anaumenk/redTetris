import { NO_COLOR } from "../constants";

export function createField(height, width, fill) {
  let field = Array(height).fill(Array(width).fill({color: NO_COLOR}));

  fill.forEach((item) => {
    item.place.forEach((place) => {
      const x = place[0];
      const y = place[1];
      field = field.map((row, i) => row.map((square, j) => j === x && i === y ? {color: item.color} : square));
    })
  });

  return field
}
