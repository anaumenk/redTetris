import { GET_ROOM, GET_ROOM_LID, GET_ROOMS, SET_GAME_STATUS, CLEAN_THE_ROOM, SET_ROOM } from '../actions';
import { UNSENT_INT } from "../constants";

const initialState = {
  allRooms: [],
  room: null,
  lid: false,
  status: null,
  roomInfo: {
    id: UNSENT_INT,
    lid: null,
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROOMS:
      return {
        ...state,
        allRooms: action.payload.allRooms
      };
    case GET_ROOM:
      return {
        ...state,
        room: action.payload.room,
        status: action.payload.status,
        allRooms: action.payload.allRooms
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
    case CLEAN_THE_ROOM:
      return {
        ...state,
        room: action.payload.room,
      };
    case SET_ROOM:
      return {
        ...state,
        roomInfo: {
          id: action.payload.roomInfo.id,
          lid: action.payload.roomInfo.lid,
        },
      };
    default:
      return state;
  }
}
