import { API, METHODS } from "../constants";
import { configAxios } from "../axios";

export function stopGame(roomId) {
  configAxios(METHODS.POST, API.STOP_GAME, { roomId });
}

export function scoreUpdate(score, roomId) {
  configAxios(METHODS.POST, API.UPDATE_ROOM_SCORE,{ score, roomId });
}

export function restartGame(roomId) {
  configAxios(METHODS.POST, API.RESTART_GAME, { roomId });
}

export function removePlayerFromRoom(roomId) {
  configAxios(METHODS.POST, API.REMOVE_PLAYER, { roomId });
}

export function changeGameMode (roomId, mode, status) {
  configAxios(METHODS.POST, API.CHANGE_GAME_MODE, { roomId, mode, status });
}

export function sendField (roomId, field) {
  configAxios(METHODS.POST, API.SEND_FIELD, { roomId, field });
}

export function setGameStatus (roomId, status) {
  configAxios(METHODS.POST, API.SET_GAME_STATUS, { roomId, status });
};
