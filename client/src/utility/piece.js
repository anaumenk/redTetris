import { FIELD_HEIGHT, FIELD_WIDTH, NO_COLOR, PIECES, PIECES_COLORS, PIECES_DIRECTION } from "../constants";
import { createField } from "./field";

export function getNextPieceFigure() {
  const keys = Object.keys(PIECES);
  return keys[Math.floor(Math.random() * Math.floor(keys.length - 1))];
}

export function getPieceTurn(random = true, i, figure) {
  return random
    ? Math.floor(Math.random() * Math.floor(PIECES[figure].length))
    : i >= PIECES[figure].length - 1 ? 0 : i + 1;
}

export function getColor() {
  const max = Object.keys(PIECES_COLORS).length;
  const colorIndex = Math.floor(Math.random() * Math.floor(max - 1));
  return PIECES_COLORS[colorIndex];
}

export function noMoreSpace(allPieces, direction, piece) {
  piece = piece || allPieces.pop();
  const field = createField(FIELD_HEIGHT, FIELD_WIDTH, allPieces);
  switch (direction) {
    case PIECES_DIRECTION.DOWN:
      return !piece.place.every((line) => line[1] + 1 < FIELD_HEIGHT
        && field[line[1] + 1][line[0]].color === NO_COLOR);
    case PIECES_DIRECTION.LEFT:
      return !piece.place.every((line) => line[0] - 1 >= 0
        && field[line[1]][line[0] - 1].color === NO_COLOR);
    case PIECES_DIRECTION.RIGHT:
      return !piece.place.every((line) => line[0] + 1 < FIELD_WIDTH
        && field[line[1]][line[0] + 1].color === NO_COLOR);
    case PIECES_DIRECTION.CURRENT:
      return !piece.place.every((line) => field[line[1]][line[0]].color === NO_COLOR);
    case PIECES_DIRECTION.ROTATE: {
      const res = piece.map((line) => {
        return line[0] < FIELD_WIDTH && line[1] < FIELD_HEIGHT
          && field[line[1]][line[0]].color === NO_COLOR;
      });
      return !res.every((line) => line);
    }
    default:
      return true;
  }
}

export const pieceMoving = {
  downInterval(field, pieceId, intervalId, start, setField) {
    if (noMoreSpace([ ...field ], PIECES_DIRECTION.DOWN)) {
        clearInterval(intervalId);
        start();
      } else {
        setField(field.map((piece) => {
          if (piece.id === pieceId) {
            piece.place = piece.place.map((line) => {
              let newLine = [ ...line ];
              newLine[1]++;
              return newLine;
            });
          }
          return piece;
        }));
      }
  },
  left(field, pieceId, setField) {
    if (!noMoreSpace([ ...field ], PIECES_DIRECTION.LEFT)) {
      setField(field.map((piece) => {
        if (piece.id === pieceId) {
          piece.place = piece.place.map((line) => {
            let newLine = [ ...line ];
            newLine[0]--;
            return newLine;
          });
        }
        return piece;
      }));
    }
  },
  right(field, pieceId, setField) {
    if (!noMoreSpace([ ...field ], PIECES_DIRECTION.RIGHT)) {
      setField(field.map((piece) => {
        if (piece.id === pieceId) {
          piece.place = piece.place.map((line) => {
            let newLine = [ ...line ];
            newLine[0]++;
            return newLine;
          });
        }
        return piece;
      }));
    }
  },
  down(field, pieceId, setField) {
    if (!noMoreSpace([ ...field ], PIECES_DIRECTION.DOWN)) {
      setField(field.map((piece) => {
        if (piece.id === pieceId) {
          piece.place = piece.place.map((line) => {
            let newLine = [ ...line ];
            newLine[1]++;
            return newLine;
          });
        }
        return piece;
      }));
    }
  },
  downBottom(field, pieceId, setField) {
    if (!noMoreSpace([ ...field ], PIECES_DIRECTION.DOWN)) {
      let newField = [ ...field ];
      const id = newField.findIndex((piece) => piece.id === pieceId);
      while (!noMoreSpace([ ...newField ], PIECES_DIRECTION.DOWN)) {
        newField[id].place = newField[id].place.map((line) => {
          let newLine = [ ...line ];
          newLine[1]++;
          return newLine;
        });
      }
      setField(newField);
    }
  },
  moveAll(field, setField, stars) {
    for (let i = 0; i < stars.length; i++) {
      field = field.map((piece) => {
        piece.place = piece.place.filter((line) => line[1] !== stars[i]);
          piece.place = piece.place.map((line) => {
            let newLine = [ ...line ];
            if (line[1] < stars[i]) {
 newLine[1]++; 
}
            return newLine;
          });
          return piece;
      });
    }
    setField(field);
  },
  rotation(field, pieceId, setField, newPiecePlace, setNextTurn) {
    setField(field.map((piece) => {
      if (piece.id === pieceId) {
        newPiecePlace = newPiecePlace.map((line) => {
          let newLine = [ ...line ];
          newLine[0] += piece.place[0][0];
          newLine[1] += piece.place[0][1];
          return newLine;
        });
        const fieldCopy = [ ...field ];
        if (fieldCopy.length > 0) {
          fieldCopy.pop();
        }
        if (!noMoreSpace(fieldCopy, PIECES_DIRECTION.ROTATE, newPiecePlace)) {
          setNextTurn();
          piece.place = newPiecePlace;
        }
      }
      return piece;
    }));
  }
};
