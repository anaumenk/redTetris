import { CREATE_ROOM, GET_ROOM, GET_ROOM_LID, GET_ROOMS, SET_GAME_STATUS } from '../actions';

const initialState = {
  rooms: [],
  createdRoom: null,
  room: null,
  lid: false,
  status: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROOMS:
      return {
        ...state,
        rooms: action.payload.rooms
      };
    case GET_ROOM:
      return {
        ...state,
        room: action.payload.room,
        status: action.payload.status,
      };
    case CREATE_ROOM:
      return {
        ...state,
        createdRoom: action.payload.createdRoom
      };
    case GET_ROOM_LID:
      return {
        ...state,
        lid: action.payload.lid,
      };
    case SET_GAME_STATUS:
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
}
