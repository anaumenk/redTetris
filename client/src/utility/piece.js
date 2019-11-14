import {COLORS, DIRECTION, FIELD_HEIGHT, FIELD_WIDTH, NO_COLOR, PIECES} from "../constants";
import {createField} from "./field";

export function getNextPieceFigure() {
  const keys = Object.keys(PIECES);
  return keys[Math.floor(Math.random() * Math.floor(keys.length - 1))];
}

export function getPieceTurn(random = true, i) {
  return random
    ? Math.floor(Math.random() * Math.floor(PIECES[getNextPieceFigure()].length - 1))
    : i === 3 ? 0 : i;
}

export function getColor() {
  const max = Object.keys(COLORS).length;
  const colorIndex = Math.floor(Math.random() * Math.floor(max - 1));
  return COLORS[colorIndex];
}

export function noMoreSpace(pieces, direction) {
  const lastPiece = pieces.pop();
  const field = createField(FIELD_HEIGHT, FIELD_WIDTH, pieces);
  switch (direction) {
    case DIRECTION.DOWN:
      return !lastPiece.place.every((line) => line[1] + 1 < FIELD_HEIGHT
        && field[line[1] + 1][line[0]].color === NO_COLOR
      );
    default:
      return true;
  }
}
