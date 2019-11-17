import { SET_NEXT_PIECE, SET_NEXT_TURN } from "./";

export const setNextPiece = () => dispatch => {
  dispatch({
    type: SET_NEXT_PIECE,
  })
};
export const setNextTurn = () => dispatch => {
  dispatch({
    type: SET_NEXT_TURN,
  })
};
