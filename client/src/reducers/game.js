import { SET_NEXT_PIECE } from '../actions';
import { getColor, getNextPieceFigure, getPieceTurn } from "../utility/piece";

const initialState = {
  nextPieceTurn: getPieceTurn(true),
  nextPieceFigure: getNextPieceFigure(),
  nextPieceColor: getColor(),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NEXT_PIECE:
      return {
        ...state,
        nextPieceTurn: getPieceTurn(true),
        nextPieceFigure: getNextPieceFigure(),
        nextPieceColor: getColor(),
      };
    default:
      return state;
  }
}
