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
