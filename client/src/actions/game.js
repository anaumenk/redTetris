import { SET_NEXT_PIECE } from "./";

export const setNextPiece = () => dispatch => {
  dispatch({
    type: SET_NEXT_PIECE,
  })
};
