import { CREATE_ROOM, GET_ROOM, GET_ROOM_LID, GET_ROOMS, STOP_GAME } from '../actions';

const initialState = {
  rooms: [],
  createdRoom: null,
  room: null,
  lid: false,
  total: null,
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
        room: action.payload.room
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
    case STOP_GAME:
      return {
        ...state,
        total: action.payload.total,
      };
    default:
      return state;
  }
}
