import { SET_NEXT_PIECE } from '../actions';
import { getNextPieceFigure, getPieceTurn } from "../utility/piece";

const initialState = {
  nextPieceTurn: getPieceTurn(true),
  nextPieceFigure: getNextPieceFigure(),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NEXT_PIECE:
      return {
        ...state,
        nextPieceTurn: action.payload.nextPieceTurn,
        nextPieceFigure: action.payload.nextPieceFigure,
      };
    default:
      return state;
  }
}
