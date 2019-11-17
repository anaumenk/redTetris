import { SET_NEXT_PIECE, SET_NEXT_TURN } from '../actions';
import { getColor, getNextPieceFigure, getPieceTurn } from "../utility/piece";
import { UNSENT_INT } from "../constants";

const initialState = {
  nextPieceTurn: getPieceTurn(true),
  nextPieceFigure: getNextPieceFigure(),
  nextPieceColor: getColor(),
  currentPieceTurn: UNSENT_INT,
  currentPieceFigure: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NEXT_PIECE:
      return {
        ...state,
        currentPieceTurn: state.nextPieceTurn,
        currentPieceFigure: state.nextPieceFigure,
        nextPieceTurn: getPieceTurn(true),
        nextPieceFigure: getNextPieceFigure(),
        nextPieceColor: getColor(),
      };
    case SET_NEXT_TURN:
      return {
        ...state,
        currentPieceTurn: getPieceTurn(false, state.currentPieceTurn)
      };
    default:
      return state;
  }
}
