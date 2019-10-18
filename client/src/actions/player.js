import { SET_PLAYER } from "./";

export const setPlayer = (name) => dispatch => {
  dispatch({
      type: SET_PLAYER,
      payload: {
          player: {
              name,
              id: 0
          }
      }
  })
};
