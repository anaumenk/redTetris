import { SET_NEXT_PIECE, SET_NEXT_TURN, clearStorageAndUnauthenticate } from "./";
import { configAxios } from "../axios";
import { API, METHODS, NO_USER_ERROR } from "../constants";

export const setNextPiece = () => dispatch => {
  dispatch({
    type: SET_NEXT_PIECE,
  });
};

export const setNextTurn = () => dispatch => {
  dispatch({
    type: SET_NEXT_TURN,
  });
};

export const changeGameMode = (roomId, mode, status) => dispatch => {
  configAxios(METHODS.POST, API.CHANGE_GAME_MODE, { roomId, mode, status }).then((res) => {
    noUserCheck(res.status, res.data.error, dispatch);
  });
};

export const stopGame = (roomId) => dispatch => {
  configAxios(METHODS.POST, API.STOP_GAME, { roomId }).then((res) => {
    noUserCheck(res.status, res.data.error, dispatch);
  });
};

export const scoreUpdate = (score, roomId) => dispatch => {
  configAxios(METHODS.POST, API.UPDATE_ROOM_SCORE,{ score, roomId }).then((res) => {
    noUserCheck(res.status, res.data.error, dispatch);
  });
};

export const restartGame = (roomId) => dispatch => {
  configAxios(METHODS.POST, API.RESTART_GAME, { roomId }).then((res) => {
    noUserCheck(res.status, res.data.error, dispatch);
  });
};

export const removePlayerFromRoom = (roomId) => dispatch => {
  configAxios(METHODS.POST, API.REMOVE_PLAYER, { roomId }).then((res) => {
    noUserCheck(res.status, res.data.error, dispatch);
  });
};

export const sendField = (roomId, field) => dispatch => {
  configAxios(METHODS.POST, API.SEND_FIELD, { roomId, field }).then((res) => {
    noUserCheck(res.status, res.data.error, dispatch);
  });
};

export const setGameStatus = (roomId, status) => dispatch => {
  configAxios(METHODS.POST, API.SET_GAME_STATUS, { roomId, status }).then((res) => {
    noUserCheck(res.status, res.data.error, dispatch);
  });
};

const noUserCheck = (status, error, dispatch) => {
  if (status === 400 && error === NO_USER_ERROR) {
    clearStorageAndUnauthenticate(dispatch);
  }
};
