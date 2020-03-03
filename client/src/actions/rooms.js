import { CLEAN_THE_ROOM, GET_ROOM, GET_ROOM_LID, SET_ROOM } from "./";
import { configAxios } from "../axios";
import { API, METHODS, UNSENT_INT } from "../constants";
import socketIOClient from "socket.io-client";
import { store } from "../store";

const socket = socketIOClient(`${process.env.HOST || "http://localhost"}:${process.env.NODE_PORT || 8000}`);

export const getRooms = () => dispatch => {
  socket.on(API.GET_ROOMS, data => {
    const prevState = store.getState().rooms;
    const roomInfo = prevState.roomInfo;
    const room = data.find((room) => room.id === roomInfo.id && room.lid.name === roomInfo.lid);
    const playerId = room && room.players ? room.players.findIndex((player) => player.id === store.getState().auth.user) : UNSENT_INT;
      dispatch({
        type: GET_ROOM,
        payload: {
          room,
          status: room ? room.status : null,
          allRooms: data,
          indestruct: (room && room.players && room.players[playerId])
              ? room.players[playerId].indestruct
              : 0
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
