import { GET_ROOMS, CREATE_ROOM } from "./";
import { configAxios } from "../axios";
import { API, METHODS } from "../constants";
import socketIOClient from "socket.io-client";
import { store } from "../store";

export const getRooms = () => dispatch => {
    const socket = socketIOClient(`${process.env.HOST || "http://localhost"}:${process.env.PORT || 8000}`);
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

export const createRoom = (newRoom) => dispatch => {
    configAxios(METHODS.POST, API.POST_ROOM, newRoom)
      .then((response) => {
          const room = response.data;
          dispatch({
              type: CREATE_ROOM,
              payload: {
                  room
              }
          })
      })
      .catch((err) => console.log(err))
};
