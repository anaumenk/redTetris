import { GET_ROOMS, CREATE_ROOM, GET_GAME_ROOM, GET_ROOM } from "./";
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

export const getAllRooms = (roomId) => dispatch => {
  socket.on(API.GET_All_ROOMS, data => {
    const prevState = store.getState().rooms.room;
    console.log(data)
    // if (data.length !== prevState.length) {
    //   dispatch({
    //     type: GET_ROOM,
    //     payload: {
    //       room
    //     }
    //   })
    // }
  });
};

export const createRoom = (newRoom) => dispatch => {
  configAxios(METHODS.POST, API.POST_ROOM, newRoom)
    .then((response) => {
      const room = response.data.data;
        dispatch({
            type: CREATE_ROOM,
            payload: {
                room
            }
        })
    })
    .catch((err) => console.log(err))
};

export const isRoom = (roomId, playerName) => dispatch => {
  configAxios(METHODS.POST, API.GET_GAME_ROOM, {id: roomId, name: playerName})
    .then((response) => {
      const room = response.data.data.room;
      const lid = response.data.data.lid;
      dispatch({
        type: GET_GAME_ROOM,
        payload: {
          room,
          lid
        }
      })
    })
    .catch((err) => console.log(err))
};
