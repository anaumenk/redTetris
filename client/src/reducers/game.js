import { SET_NEXT_PIECE, SET_NEXT_TURN } from '../actions';
import { getColor, getNextPieceFigure, getPieceTurn } from "../utility/piece";
import { UNSENT_INT } from "../constants";

const figure = getNextPieceFigure();

const initialState = {
  nextPieceFigure: figure,
  nextPieceTurn: getPieceTurn(true, UNSENT_INT, figure),
  nextPieceColor: getColor(),
  currentPieceTurn: UNSENT_INT,
  currentPieceFigure: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NEXT_PIECE:
      const nextPieceFigure = getNextPieceFigure();
      return {
        ...state,
        currentPieceTurn: state.nextPieceTurn,
        currentPieceFigure: state.nextPieceFigure,
        nextPieceTurn: getPieceTurn(true, UNSENT_INT, nextPieceFigure),
        nextPieceFigure,
        nextPieceColor: getColor(),
      };
    case SET_NEXT_TURN:
      return {
        ...state,
        currentPieceTurn: getPieceTurn(false, state.currentPieceTurn, state.currentPieceFigure)
      };
    default:
      return state;
  }
}
