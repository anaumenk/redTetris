import {COLORS, PIECES} from "../constants";

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
