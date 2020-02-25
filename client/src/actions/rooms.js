import { CLEAN_THE_ROOM, GET_ROOM, GET_ROOM_LID, SET_GAME_STATUS, SET_ROOM } from "./";
import { configAxios } from "../axios";
import { API, METHODS } from "../constants";
import socketIOClient from "socket.io-client";
import { store } from "../store";

const socket = socketIOClient(`${process.env.HOST || "http://localhost"}:${process.env.NODE_PORT || 8000}`);

export const getRooms = () => dispatch => {
  socket.on(API.GET_ROOMS, data => {
    const prevState = store.getState().rooms;
    const roomInfo = prevState.roomInfo;
    const room = data.find((room) => room.id === roomInfo.id && room.lid.name === roomInfo.lid);
      dispatch({
        type: GET_ROOM,
        payload: {
          room,
          status: room ? room.status : null,
          allRooms: data
        }
      });
  });
};

export const setRoom = (id, lid) => dispatch => {
  dispatch({
    type: SET_ROOM,
    payload: {
      roomInfo: {
        id, lid
      }
    }
  });
};

export const isRoomLid = (roomId, playerName) => dispatch => {
  configAxios(METHODS.POST, API.GET_ROOM_LID, { id: roomId, name: playerName })
    .then((response) => {
      const data = response.data.data;
      if (data) {
        const lid = data.lid;
        const inGame = data.inGame;
        dispatch({
          type: GET_ROOM_LID,
          payload: {
            lid,
            inGame
          }
        });
      }
    })
    .catch((err) => console.log(err));
};

export const setGameStatus = (roomId, status) => dispatch => {
  configAxios(METHODS.POST, API.SET_GAME_STATUS, { roomId, status }).then((response) => {
    const data = response.data.data;
    if (data) {
      const status = data.status;
      dispatch({
        type: SET_GAME_STATUS,
        payload: {
          status
        }
      });
    }
  })
    .catch((err) => console.log(err));
};

export const cleanTheRoom = () => dispatch => {
  dispatch({
    type: CLEAN_THE_ROOM,
    payload: {
      room: null,
      lid: false,
      status: null,
    }
  });
};
