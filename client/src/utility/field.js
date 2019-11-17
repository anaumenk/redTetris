import { FIELD_HEIGHT, FIELD_WIDTH, NO_COLOR } from "../constants";
import { pieceMoving } from "./piece";

export function createField(height, width, fill) {
  let field = Array(height).fill(Array(width).fill({color: NO_COLOR}));

  fill.forEach((item) => {
    item.place.forEach((place) => {
      const x = place[0];
      const y = place[1];
      field = field.map((row, i) => row.map((square, j) => j === x && i === y ? {color: item.color} : square));
    })
  });

  return field;
}

export function checkFieldFill(allPieces, setField) {
  const field = createField(FIELD_HEIGHT, FIELD_WIDTH, allPieces);
  for (let i = 0; i < field.length; i++) {
    if (field[i].every((square) => square.color !== NO_COLOR)) {
      pieceMoving.moveAll(allPieces, setField, i);
      return true;
    }
  }
  return false;
}
