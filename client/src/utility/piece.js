import { fieldHeight, PIECES } from "../constants";

export function getNextPieceFigure() {
  const keys = Object.keys(PIECES);
  return keys[Math.floor(Math.random() * Math.floor(keys.length - 1))];
}

export function getPieceTurn(random = true, i) {
  return random
    ? Math.floor(Math.random() * Math.floor(PIECES[getNextPieceFigure()].length - 1))
    : i === 3 ? 0 : i;
}

export function getNextPiece(figure, turn) {
  return PIECES[figure][turn];
}

export function movePieceDown(piece, movePiece) {
  console.log(piece)
  if (piece.find((line) => line[1] === fieldHeight - 1)) {
    clearInterval(movePieceDown);
    // add new piece to the field
    return ;
  }
  const place = piece.map((line) => {
    line[1]++;
    return line;
  });
  movePiece(place)
}
