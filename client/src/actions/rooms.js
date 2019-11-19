import { GET_ROOMS, CREATE_ROOM, GET_ROOM_LID, GET_ROOM, STOP_GAME } from "./";
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
    if (room && room.players &&
      (prevState && prevState.players
        ?
          (room.players.length !== prevState.players.length
            || !room.players.every((p, i) => p.score === prevState.players[i].score)
            // || room.status !== prevState.status
          )
        : true
      )
    ) {
      dispatch({
        type: GET_ROOM,
        payload: {
          room,
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

export const scoreUpdate = (score, roomId) => dispatch => {
  configAxios(METHODS.POST, API.UPDATE_ROOM_SCORE,{ score, roomId });
};

export const stopGame = (roomId) => dispatch => {
  configAxios(METHODS.POST, API.STOP_GAME, { roomId }).then((response) => {
    const data = response.data.data;
    if (data) {
      const total = data.total;
      dispatch({
        type: STOP_GAME,
        payload: {
          total
        }
      })
    }
  })
    .catch((err) => console.log(err));
};


