import {CREATE_ROOM, GET_GAME_ROOM, GET_ROOMS} from '../actions';

const initialState = {
    rooms: [],
    createdRoom: null,
    room: null,
    lid: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ROOMS:
            return {
                ...state,
                rooms: action.payload.rooms
            };
        case CREATE_ROOM:
            return {
                ...state,
                createdRoom: action.payload.room
            };
        case GET_GAME_ROOM:
            return {
                ...state,
                room: action.payload.room,
                lid: action.payload.lid,
            };
        default:
            return state;
    }
}
