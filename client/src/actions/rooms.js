import { GET_ROOMS, CREATE_ROOM, GET_ROOM_LID, GET_ROOM, SET_GAME_STATUS } from "./";
import { configAxios } from "../axios";
import { API, METHODS } from "../constants";
import socketIOClient from "socket.io-client";
import { store } from "../store";

const socket = socketIOClient(`${process.env.HOST || "http://localhost"}:${process.env.PORT || 8000}`);

export const getRooms = () => dispatch => {
  socket.on(API.GET_ROOMS, data => {
    const prevState = store.getState().rooms.rooms;
    if (data.length !== prevState.length) {
      dispatch({
        type: GET_ROOMS,
        payload: {
          rooms: data
        }
      })
    }
  });
};

export const getAllRooms = (roomId, playerName) => dispatch => {
  socket.on(API.GET_All_ROOMS, data => {
    const prevState = store.getState().rooms.room;
    const room = data.find((room) => room.id === roomId && room.lid.name === playerName);
    if ((room && room.players &&
      (prevState && prevState.players && prevState.room
        && !Object.keys(room.mode).every((item) => room.mode[item] === prevState.room.mode[item])
        ?
          (room.players.length !== prevState.players.length
            || !room.players.every((p, i) => p.score === prevState.players[i].score)
            || room.status !== prevState.status
          )
        : true
      )
    ) || prevState !== room) {
      dispatch({
        type: GET_ROOM,
        payload: {
          room,
          status: room ? room.status : null
        }
      })
    }
  });
};

export const createRoom = (newRoom) => dispatch => {
  configAxios(METHODS.POST, API.POST_ROOM, newRoom)
    .then((response) => {
      const createdRoom = response.data.data;
        dispatch({
          type: CREATE_ROOM,
          payload: {
            createdRoom
          }
        })
    })
    .catch((err) => console.log(err))
};

export const isRoomLid = (roomId, playerName) => dispatch => {
  configAxios(METHODS.POST, API.GET_ROOM_LID, {id: roomId, name: playerName})
    .then((response) => {
      const data = response.data.data;
      if (data) {
        const lid = data.lid;
        dispatch({
          type: GET_ROOM_LID,
          payload: {
            lid
          }
        })
      }
    })
    .catch((err) => console.log(err))
};

export const nullifyCreatedRoom = () => dispatch => {
  dispatch({
    type: CREATE_ROOM,
    payload: {
      createdRoom: null
    }
  })
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
      })
    }
  })
    .catch((err) => console.log(err));
};


