import { GET_ROOMS, CREATE_ROOM } from "./";
import { configAxios } from "../axios";
import { API, METHODS } from "../constants";

export const getRooms = () => dispatch => {
    configAxios(METHODS.GET, API.GET_ROOMS)
      .then((response) => {
          const rooms = response.data;
          dispatch({
              type: GET_ROOMS,
              payload: {
                  rooms
              }
          })
      })
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
}
