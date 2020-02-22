import { CLEAN_THE_ROOM, GET_ROOM, GET_ROOMS, GET_ROOM_LID, SET_GAME_STATUS, SET_ROOM } from "./";
import { configAxios } from "../axios";
import { API, METHODS } from "../constants";
import socketIOClient from "socket.io-client";
import { store } from "../store";

const socket = socketIOClient(`${process.env.HOST || "http://localhost"}:${process.env.PORT || 8000}`);

export const getRooms = () => dispatch => {
  socket.on(API.GET_ROOMS, data => {
    const prevState = store.getState().rooms;
    const allRooms = prevState.allRooms;
    const prevRoom = prevState.room;
    const roomInfo = prevState.roomInfo;
    const room = data.find((room) => room.id === roomInfo.id && room.lid.name === roomInfo.lid);
    if (!room || !prevRoom || (room && !prevRoom) || (room.players && !prevRoom.players)
      || room.id !== prevRoom.id
      || !Object.keys(room.mode).every((item) => room.mode[item] === prevRoom.mode[item])
      || room.players.length !== prevRoom.players.length
      || !room.players.every((p, i) => p.score === prevRoom.players[i].score)
      || room.status !== prevRoom.status) {
      dispatch({
        type: GET_ROOM,
        payload: {
          room,
          status: room ? room.status : null,
          allRooms: allRooms.length === data.length ? allRooms : data
        }
      });
    }
    // else {
    //   dispatch({
    //     type: GET_ROOMS,
    //     payload: {
    //       allRooms: allRooms.length === data.length ? allRooms : data
    //     }
    //   })
    // }
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
        dispatch({
          type: GET_ROOM_LID,
          payload: {
            lid
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
