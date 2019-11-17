import { COLORS, DIRECTION, FIELD_HEIGHT, FIELD_WIDTH, NO_COLOR, PIECES } from "../constants";
import { createField } from "./field";

export function getNextPieceFigure() {
  const keys = Object.keys(PIECES);
  return keys[Math.floor(Math.random() * Math.floor(keys.length - 1))];
}

export function getPieceTurn(random = true, i) {
  return random
    ? Math.floor(Math.random() * Math.floor(PIECES[getNextPieceFigure()].length))
    : i === 3 ? 0 : i + 1;
}

export function getColor() {
  const max = Object.keys(COLORS).length;
  const colorIndex = Math.floor(Math.random() * Math.floor(max - 1));
  return COLORS[colorIndex];
}

export function noMoreSpace(allPieces, direction, piece) {
  piece = piece || allPieces.pop();
  const field = createField(FIELD_HEIGHT, FIELD_WIDTH, allPieces);
  switch (direction) {
    case DIRECTION.DOWN:
      return !piece.place.every((line) => line[1] + 1 < FIELD_HEIGHT
        && field[line[1] + 1][line[0]].color === NO_COLOR);
    case DIRECTION.LEFT:
      return !piece.place.every((line) => line[0] - 1 >= 0
        && field[line[1]][line[0] - 1].color === NO_COLOR);
    case DIRECTION.RIGHT:
      return !piece.place.every((line) => line[0] + 1 < FIELD_WIDTH
        && field[line[1]][line[0] + 1].color === NO_COLOR);
    case DIRECTION.CURRENT:
      return !piece.place.every((line) => field[line[1]][line[0]].color === NO_COLOR);
    default:
      return true;
  }
}

export const pieceMoving = {
  downInterval(field, pieceId, intervalId, start, setField) {
    if (noMoreSpace([...field], DIRECTION.DOWN)) {
        clearInterval(intervalId);
        start();
      } else {
        setField(field.map((piece) => {
          if (piece.id === pieceId) {
            piece.place = piece.place.map((line) => {
              let newLine = [...line];
              newLine[1]++;
              return newLine;
            });
          }
          return piece;
        }));
      }
  },
  left(field, pieceId, setField) {
    if (!noMoreSpace([...field], DIRECTION.LEFT)) {
      setField(field.map((piece) => {
        if (piece.id === pieceId) {
          piece.place = piece.place.map((line) => {
            let newLine = [...line];
            newLine[0]--;
            return newLine;
          });
        }
        return piece;
      }));
    }
  },
  right(field, pieceId, setField) {
    if (!noMoreSpace([...field], DIRECTION.RIGHT)) {
      setField(field.map((piece) => {
        if (piece.id === pieceId) {
          piece.place = piece.place.map((line) => {
            let newLine = [...line];
            newLine[0]++;
            return newLine;
          });
        }
        return piece;
      }));
    }
  },
  down(field, pieceId, setField) {
    if (!noMoreSpace([...field], DIRECTION.DOWN)) {
      setField(field.map((piece) => {
        if (piece.id === pieceId) {
          piece.place = piece.place.map((line) => {
            let newLine = [...line];
            newLine[1]++;
            return newLine;
          });
        }
        return piece;
      }));
    }
  },
  downBottom(field, pieceId, setField) {
    if (!noMoreSpace([...field], DIRECTION.DOWN)) {
      let newField = [...field];
      const id = newField.findIndex((piece) => piece.id === pieceId);
      while (!noMoreSpace([...newField], DIRECTION.DOWN)) {
        newField[id].place = newField[id].place.map((line) => {
          let newLine = [...line];
          newLine[1]++;
          return newLine;
        })
      }
      setField(newField);
    }
  },
  moveAll(field, setField, lineId) {
    setField(field.map((piece) => {
      piece.place = piece.place.filter((line) => line[1] !== lineId)
      piece.place = piece.place.map((line) => {
        let newLine = [...line];
        if (line[1] < lineId) { newLine[1]++; }
        return newLine;
      });
      return piece;
    }))
  },
  rotation(field, pieceId, setField, newPiecePlace, setNextTurn) {
    setField(field.map((piece) => {
      if (piece.id === pieceId) {
        newPiecePlace = newPiecePlace.map((line) => {
          let newLine = [...line];
          newLine[0] += piece.place[0][0];
          newLine[1] += piece.place[0][1];
          return newLine;
        });
        if (newPiecePlace.every((line) => line[0] < FIELD_WIDTH && line[1] < FIELD_HEIGHT)) {
          setNextTurn();
          piece.place = newPiecePlace;
        }
      }
      return piece
    }))
  }
};
