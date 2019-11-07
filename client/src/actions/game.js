import { SET_NEXT_PIECE } from "./";
import { getNextPieceFigure, getPieceTurn } from "../utility/piece";

export const setNextPiece = () => dispatch => {
  dispatch({
    type: SET_NEXT_PIECE,
    payload: {
      nextPieceTurn: getPieceTurn(),
      nextPieceFigure: getNextPieceFigure(),
    }
  })
};
